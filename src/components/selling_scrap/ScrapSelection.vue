<script setup lang="ts">
import ScrapTypeCard from '@/components/selling_scrap/ScrapTypeCard.vue';
import ScrapItem from '@/views/selling_scrap/ScrapItem.vue';
import { ref, onMounted } from 'vue';

interface ScrapType {
  id: number;
  name: string;
  icon: string;
  categories: any[];
}

const scrapTypes = ref<ScrapType[]>([]);
const selectedCategoryName = ref<string | null>(null);
const progress = ref(10);

const fetchScrapTypes = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + 'api/inventory/home/');
    const json = await response.json();
    console.log("Données reçues :", json);

    scrapTypes.value = json.data?.categories?.product ?? [];
  } catch (error) {
    console.error('Erreur lors du chargement des catégories :', error);
  }
};

import { useRouter } from 'vue-router';

const router = useRouter();

const handleCategorySelect = (type: ScrapType) => {
  console.log("Catégorie sélectionnée :", type.name);
  
  localStorage.setItem('selectedCategoryName', type.name); // Pour affichage
  localStorage.setItem('selectedCategoryId', type.id.toString()); // Pour envoi backend

  router.push({ name: 'ScrapItem', params: { categoryName: type.name } });
};


onMounted(() => {
  fetchScrapTypes();
});
</script>

<template>
  <div class="scrap-selection">
    <div class="selection-header">
      <h1 class="selection-title">Sell Scrap</h1>
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="progress-text">{{ progress }}%</span>
      </div>
    </div>

    <!-- Étape 1 : Choix de la catégorie -->
    <div v-if="!selectedCategoryName" class="selection-content">
      <div class="step-header">
        <div class="step-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="2"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="8"></line>
          </svg>
        </div>
        <h2 class="step-title">Choose <span class="accent">Scrap</span> Type</h2>
      </div>

      <div class="scrap-grid">
        <div
          v-for="type in scrapTypes"
          :key="type.id"
          class="scrap-grid-item"
          @click="handleCategorySelect(type)"
        >
          <ScrapTypeCard :type="type" />
        </div>
      </div>
    </div>

   
   
  </div>
</template>

<style scoped>
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
  background-color: #057970;
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
  padding: 24px;
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
  background-color: #057970;
  color: white;
}

.step-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.accent {
  color: #057970;
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
</style>
