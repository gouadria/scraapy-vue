<template>
  <div class="page-container">
    <!-- NavBar at the top -->
    <navBar />
    <div class="page-container">
      <!-- Header -->
      <header class="header">
        <div class="header-title">Sell Scrap</div>
        <div class="progress-bar">
          <div class="progress-bar-fill"></div>
        </div>
      </header>

      <!-- Main -->
      <main class="content">
        <section class="card">
          <h2>Details of your {{ categoryName }} Scrap</h2>

          <table class="scrap-table">
            <thead>
              <tr>
                <th>Scrap Name</th>
                <th>Size</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in scrapItems" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.size }}</td>
                <td>{{ item.quantity }}</td>
                <td>
                  <button class="delete-btn" @click="deleteItem(item.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <button @click="showAddForm = true" class="add-btn">+ Add Scrap</button>

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

          <div class="nav-buttons">
            <button>Previous</button>
            <button class="next-btn" @click="goToSellScrap">Next</button>
          </div>
        </section>
      </main>

      <!-- Add Form Modal -->
      <div v-if="showAddForm" class="modal-overlay">
        <div class="modal">
          <h3>Add Scrap Item</h3>
          <form @submit.prevent="submitNewItem">
            <select v-model="newItem.name" required>
              <option disabled value="">-- Select Category --</option>
              <option v-for="category in categoriesFromGroup" :key="category.id" :value="category.name">
                {{ category.name }}
              </option>
            </select>

            <input v-model="newItem.size" placeholder="Size" required />
            <input v-model.number="newItem.quantity" type="number" placeholder="Quantity" min="1" required />
            <div class="modal-actions">
              <button type="button" @click="showAddForm = false">Cancel</button>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="w-full">
      <!-- Footer at the end -->
      <footerComponant />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'

const router = useRouter()
const route = useRoute()
const categoryName = ref('')
const categoriesFromGroup = ref([])

const showAddForm = ref(false)
const description = ref('')
const scrapItems = ref([])
const images = ref([])
const newItem = ref({ name: '', size: '', quantity: 1 })

const fileInput = ref(null)

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

function goToSellScrap() {
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






<style scoped>
.page-container {
  font-family: Arial, sans-serif;
  padding: 10px;
  width: 100%;
}

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

.progress-bar {
  margin-top: 10px;
  background: #ffffff;
  height: 8px;
  border-radius: 4px;
  width: 50%;
}

.progress-bar-fill {
  width: 25%;
  height: 50%;
  background-color: #10b981;
  border-radius: 4px;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 80%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.scrap-table {
  width: 60%;
  margin-bottom: 1rem;
  border-collapse: collapse;
}

.scrap-table th, .scrap-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
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

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.next-btn {
  background: #10b981;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.next-btn:hover {
  background: #0e9f6e;
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
