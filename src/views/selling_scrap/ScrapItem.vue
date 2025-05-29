<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import NavigationButtons from '@/components/selling_scrap/NavigationButtons.vue';

const router = useRouter()
const route = useRoute()
const categoryName = ref('')
const categoriesFromGroup = ref([])
const progress = ref(20);

const showAddForm = ref(false)
const description = ref('')
const scrapItems = ref([])
const images = ref([])
const newItem = ref({ name: '', size: '', quantity: 1 })

const fileInput = ref(null)

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onMounted(() => {
  categoryName.value = route.params.categoryName || 'Unknown'
  fetchCategoriesForGroup(categoryName.value)

  const storedScrapItems = localStorage.getItem('scrapItems')
  if (storedScrapItems) scrapItems.value = JSON.parse(storedScrapItems)

  const storedImages = localStorage.getItem('images')
  if (storedImages) images.value = JSON.parse(storedImages)

  const storedDescription = localStorage.getItem('description')
  if (storedDescription) description.value = storedDescription

  const storedShowAddForm = localStorage.getItem('showAddForm')
  if (storedShowAddForm) showAddForm.value = JSON.parse(storedShowAddForm)
})

watch(scrapItems, val => {
  localStorage.setItem('scrapItems', JSON.stringify(val))
}, { deep: true })

watch(images, val => {
  localStorage.setItem('images', JSON.stringify(val))
}, { deep: true })

watch(description, val => {
  localStorage.setItem('description', val)
})

watch(showAddForm, val => {
  localStorage.setItem('showAddForm', JSON.stringify(val))
})

function deleteItem(id) {
  scrapItems.value = scrapItems.value.filter(item => item.id !== id)
}

const handlePrevious = () => {
  router.push('/scrap-category')
};
const handleNext = () => {
  router.push('/sell-scrap')
}

async function fetchCategoriesForGroup(groupName) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + 'api/inventory/home/')
    const json = await response.json()

    const productGroups = json.data.categories.product
    const matchedGroup = productGroups.find(group => group.name.toLowerCase() === groupName.toLowerCase())

    if (matchedGroup) {
      categoriesFromGroup.value = matchedGroup.categories
    } else {
      categoriesFromGroup.value = []
    }
  } catch (error) {
    console.error('Erreur lors du chargement des catégories :', error)
    categoriesFromGroup.value = []
  }
}

function triggerUpload() {
  fileInput.value?.click()
}

function handleFileUpload(event) {
  const files = event.target.files
  if (files && files.length > 0) {
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = e => {
        images.value.push(e.target.result)
      }
      reader.readAsDataURL(file)
    })
    event.target.value = ''
  }
}

function deleteImage(index) {
  images.value.splice(index, 1)
}

function captureNow() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.createElement('video')
      video.srcObject = stream
      video.play()

      video.onloadeddata = () => {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext('2d')
        context.drawImage(video, 0, 0)

        const imageData = canvas.toDataURL('image/png')
        images.value.push(imageData)

        stream.getTracks().forEach(track => track.stop())
      }
    })
    .catch(err => {
      console.error('Camera access denied:', err)
    })
}

function submitNewItem() {
  const id = Date.now()
  scrapItems.value.push({ ...newItem.value, id })
  newItem.value = { name: '', size: '', quantity: 1 }
  showAddForm.value = false
}
</script>

<template>
  <div class="app">
    <navBar />
    <main class="main-content">
      <div class="scrap-selection">
        <div class="selection-header">
          <h1 class="selection-title">{{ t('selling_scrap.sell_scrap') }}</h1>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <span class="progress-text">{{ progress }}%</span>
          </div>
        </div>

        <div class="selection-content">
          <section class="card">
            <h2>{{ t('selling_scrap.detailsScrap') }} {{ categoryName }}</h2>

            <table class="scrap-table">
              <thead>
                <tr>
                  <th>{{ t('selling_scrap.scrapName') }}</th>
                  <th>{{ t('selling_scrap.size') }}</th>
                  <th>{{ t('selling_scrap.quantity') }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in scrapItems" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.size }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>
                    <button class="delete-btn" @click="deleteItem(item.id)">{{ t('selling_scrap.delete') }}</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <button @click="showAddForm = true" class="add-btn">+ {{ t('selling_scrap.addScrap') }}</button>

            <section class="section">
              <h2>Pictures</h2>
              <div class="button-group">
                <button @click="triggerUpload">Upload</button>
                <button @click="captureNow">Capture Now</button>
                <input
                  type="file"
                  accept="image/*"
                  ref="fileInput"
                  class="hidden-input"
                  @change="handleFileUpload"
                />
              </div>
              <div class="image-grid">
                <div v-for="(image, index) in images" :key="index" class="image-wrapper">
                  <img :src="image" :alt="`Scrap ${index + 1}`" />
                  <button class="delete-btn image-delete" @click.prevent="deleteImage(index)">×</button>
                </div>
              </div>
            </section>

            <section class="section">
              <h2>Description</h2>
              <textarea v-model="description" maxlength="500" placeholder="Type here..." required></textarea>
              <div class="char-limit">Character limit: {{ description.length }}/500</div>
            </section>
          </section>
        </div>

        <div v-if="showAddForm" class="modal-overlay">
          <div class="modal">
            <h3>{{ t('selling_scrap.addScrapItem') }}</h3>
            <form @submit.prevent="submitNewItem">
              <select v-model="newItem.name" required>
                <option disabled value="">-- {{ t('selling_scrap.selectCategory') }} --</option>
                <option v-for="category in categoriesFromGroup" :key="category.id" :value="category.name">
                  {{ category.name }}
                </option>
              </select>

              <input v-model="newItem.size" :placeholder="t('selling_scrap.size')" required />
              <input v-model.number="newItem.quantity" type="number" :placeholder="t('selling_scrap.quantity')" min="1" required />
              <div class="modal-actions">
                <button type="button" @click="showAddForm = false">{{ t('selling_scrap.cancel') }}</button>
                <button type="submit">{{ t('selling_scrap.add') }}</button>
              </div>
            </form>
          </div>
        </div>

        <NavigationButtons @previous="handlePrevious" @next="handleNext" />
      </div>
    </main>
    <footerComponant />
  </div>
</template>

<style>
  .scrap-selection {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .selection-header {
    padding: 24px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .selection-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .progress-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .progress-bar {
    width: 200px;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: #16b277;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 14px;
    font-weight: 500;
    color: #666;
  }

  .selection-content {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 32px;
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .step-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #16b277;
    color: white;
  }

  .step-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .accent {
    color: #16b277;
  }

  .scrap-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @media (max-width: 992px) {
    .scrap-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .scrap-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .progress-bar {
      width: 150px;
    }
  }

  @media (max-width: 576px) {
    .scrap-grid {
      grid-template-columns: 1fr;
    }
    
    .selection-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .progress-container {
      width: 100%;
    }
    
    .progress-bar {
      flex: 1;
    }
  }

  /* old */
  .header {
    background: #ffffff;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .header-title {
    font-size: 24px;
    font-weight: bold;
  }

  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .scrap-table {
    width: 60%;
    margin-bottom: 1rem;
    border-collapse: collapse;
    outline: 1px solid gainsboro;
    border-radius: 8px;
  }

  .scrap-table th, .scrap-table td {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    text-align: start;
  }

  .add-btn {
    background: #0e9f6e;
    color: white;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .section {
    margin-top: 2rem;
  }

  .button-group {
    margin-bottom: 1rem;
  }

  .button-group button {
    background: #6b7280;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    margin-right: 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .image-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    overflow: hidden;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-delete {
    position: absolute;
    top: 4px;
    right: 4px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    min-height: 100px;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    resize: vertical;
  }

  .char-limit {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }

  .hidden-input {
    display: none;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 300px;
    
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
</style>