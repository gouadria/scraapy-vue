<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import SellScrapForm from '@/components/selling_scrap/SellScrapForm.vue';
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import ProgressBar from '@/components/selling_scrap/ProgressBar.vue';
import NavigationButtons from '@/components/selling_scrap/NavigationButtons.vue';

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const progress = ref(80);

const router = useRouter();

const handlePrevious = () => {
  router.push('/location-picker')
};
const handleNext = () => {
  router.push('/sell-scrap-confirmation');
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

        <SellScrapForm />

        
        <NavigationButtons @previous="handlePrevious" @next="handleNext" />
        
      </div>
    </main>
    <footerComponant />
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
</style>