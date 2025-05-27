<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

import Navigation from '@/components/UIElements/navBar.vue';
import ProgressBar from '@/components/selling_scrap/ProgressBar.vue';
import ScrapEstimation from '@/components/selling_scrap/ScrapEstimation.vue';
import NavigationButtons from '@/components/selling_scrap/NavigationButtons.vue';

const progress = ref(40);
const router = useRouter()

const handlePrevious = () => {
  // Handle previous step logic
  console.log('Navigate to previous step');
};
const handleNext = () => {
  router.push('/scrap-phone');
}

</script>

<template>
  <div class="sell-scrap">
    <Header />
    <Navigation />
    
    <main class="main-content">
      <div class="container">
        <h1 class="page-title">Sell Scrap</h1>
        
        <ProgressBar :percentage="progress" />
        
        <ScrapEstimation />
        
        <NavigationButtons @previous="handlePrevious" @next="handleNext" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-content {
  background-color: #f5f7fa;
  min-height: calc(100vh - 120px);
  padding: 40px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
}
</style>