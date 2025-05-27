<script setup lang="ts">
import { ref } from 'vue';
import ProgressBar from '@/components/selling_scrap/ProgressBar.vue';
import PhoneVerification from '@/components/selling_scrap/PhoneVerification.vue';

const currentStep = ref(1);
const totalSteps = ref(5);

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const goToNextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++;
  }
};
</script>

<template>
  <div class="sell-scrap-container">
    <ProgressBar 
      :currentStep="currentStep" 
      :totalSteps="totalSteps" 
    />
    
    <PhoneVerification 
      v-if="currentStep === 1"
      @previous="goToPreviousStep"
      @next="goToNextStep"
    />
    
    <!-- Additional steps would be added here -->
  </div>
</template>

<style scoped>
.sell-scrap-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}
</style>