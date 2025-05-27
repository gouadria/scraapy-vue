<template>
  <div class="right-section">
    <div class="process-container">
      <div class="process-bg">
        <h2 class="process-title">It's as Easy as 1, 2, 3</h2>
        <p class="process-subtitle">Get Paid for Your Scrap in Minutes.</p>
        <div class="process-graphic"></div>
      </div>
      
      <div class="process-steps">
        <div 
          v-for="step in steps" 
          :key="step.number"
          class="step"
        >
          <div class="step-number-container">
            <div class="step-number">{{ step.number }}</div>
            <div v-if="step.number < steps.length" class="step-line"></div>
          </div>
          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ProcessStep } from '@/types';

const steps = ref<ProcessStep[]>([
  {
    number: 1,
    title: 'Share What You\'ve Got',
    description: 'Give us the details about your scrap, and we\'ll provide you with a fair offer.'
  },
  {
    number: 2,
    title: 'We\'ll Pick It Up',
    description: 'A driver will collect your scrap right from your doorstep—just like your favorite food delivery.'
  },
  {
    number: 3,
    title: 'Get Paid Instantly',
    description: 'Receive your payment directly into your e-wallet or bank account, hassle-free.'
  }
]);
</script>

<style scoped>
.right-section {
  width: 50%;
  background-color: var(--primary-teal);
  border-radius: 14px;
  position: relative;
  overflow: hidden;
}

.process-container {
  padding: 50px;
  height: 100%;
  position: relative;
}

.process-bg {
  background-color: var(--primary-dark);
  border-radius: 14px;
  padding: 58px;
  position: relative;
  height: auto;
  min-height: 150px;
}

.process-title {
  font-size: 30px;
  font-weight: 700;
  line-height: 37px;
  color: var(--text-light);
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
}

.process-subtitle {
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  color: var(--text-light);
  position: relative;
  z-index: 2;
}

.process-graphic {
  position: absolute;
  right: 59px;
  top: 28px;
  z-index: 1;
  width: 160px;
  height: 80px;
  background: linear-gradient(45deg, #15b377, #39ce91);
  opacity: 0.2;
  border-radius: 40px;
}

.process-steps {
  margin-top: 50px;
}

.step {
  display: flex;
  margin-bottom: 30px;
}

.step-number-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-number {
  width: 24px;
  height: 24px;
  background-color: var(--primary-green);
  border: 2px solid var(--primary-green);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
}

.step-line {
  width: 2px;
  height: 66px;
  background-color: var(--primary-green);
  margin-top: 4px;
}

.step-content {
  margin-left: 16px;
}

.step-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  color: var(--primary-dark);
  margin-bottom: 4px;
}

.step-description {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--text-secondary);
  max-width: 450px;
}

@media (max-width: 1200px) {
  .right-section {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .process-container {
    padding: 30px;
  }
  
  .process-bg {
    padding: 30px;
  }
  
  .process-graphic {
    display: none;
  }
}

@media (max-width: 576px) {
  .process-title {
    font-size: 24px;
    line-height: 30px;
  }
  
  .process-subtitle {
    font-size: 16px;
  }
  
  .step-description {
    font-size: 14px;
    line-height: 20px;
  }
}
</style>