<script setup lang="ts">
defineProps<{
  percentage: number;
}>();
</script>

<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${percentage}%` }"></div>
    </div>
    <span class="progress-text">{{ percentage }}%</span>
  </div>
</template>

<style scoped>
.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
}

.progress-bar {
  height: 8px;
  background-color: #18A77A;
  border-radius: 4px;
  flex-grow: 1;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #18A77A;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}
</style>