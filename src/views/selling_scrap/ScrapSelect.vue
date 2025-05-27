<template>
  <div class="app-container">
    <RatesTicker :rates="todaysRates" />
    <NavBar />
    <main class="main-container">
      <UserTypeSelection @user-type-selected="handleUserTypeSelection" />
      <ProcessSteps />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import NavBar from '@/components/UIElements/NavBar.vue';
import RatesTicker from '@/components/selling_scrap/RatesTicker.vue';
import UserTypeSelection from '@/components/selling_scrap/UserTypeSelection.vue';
import ProcessSteps from '@/components/selling_scrap/ProcessSteps.vue';
import AppFooter from '@/components/UIElements/footerComponant.vue';
import { Rate, UserType } from '@/types';

// Sample rates data
const todaysRates = ref<Rate[]>([
  { material: 'Aluminum', value: 12.73, unit: 'KG' },
  { material: 'Iron', value: 5.44, unit: 'KG' },
  { material: 'Steel', value: 15.03, unit: 'KG' },
  { material: 'Brass', value: 22.95, unit: 'KG' },
  { material: 'Gold', value: 22.95, unit: 'KG' },
  { material: 'Silver', value: 22.95, unit: 'KG' },
  { material: 'Wood', value: 22.95, unit: 'KG' },
  { material: 'Cobalt', value: 22.95, unit: 'KG' }
]);

// Handle user type selection
const handleUserTypeSelection = (userType: UserType) => {
  console.log('Selected user type:', userType);
  // In a real application, you would save this selection
  // and potentially navigate to the next page
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  display: flex;
  padding: 50px 80px;
}

@media (max-width: 1200px) {
  .main-container {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 30px 20px;
  }
}
</style>