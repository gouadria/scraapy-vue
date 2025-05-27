<script setup lang="ts">
defineEmits(['previous', 'next']);
</script>

<template>
  <div class="nav-buttons">
    <button class="button button-previous" @click="$emit('previous')">
      <span class="button-icon">←</span>
      Previous
    </button>
    <button class="button button-next" @click="$emit('next')">
      Next
      <span class="button-icon">→</span>
    </button>
  </div>
</template>

<style scoped>
.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin: 32px 0;
}

.button {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-previous {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
}

.button-previous:hover {
  background-color: #f5f5f5;
}

.button-next {
  background-color: #18A77A;
  color: white;
  border: none;
}

.button-next:hover {
  background-color: #148f68;
}

.button-icon {
  margin: 0 4px;
}
</style>