<script setup lang="ts">
import { onMounted, ref } from 'vue';

const fullName = ref('User');

onMounted(() => {
  const savedData = localStorage.getItem('scrapUserData');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      fullName.value = parsed.fullName || 'User';
    } catch (e) {
      console.error('Failed to parse user data', e);
    }
  }

  // Clear localStorage
  localStorage.removeItem('scrapUserData');

  // Optional: clear all input fields on the page
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => (input.value = ''));
});
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-lg text-center max-w-md mx-auto mt-10 border border-gray-200">
    <h2 class="text-3xl font-bold text-green-600 mb-4">Order Confirmed ✅</h2>
    <p class="text-gray-700 mb-2">Thank you, <strong>{{ fullName }}</strong>!</p>
    <p class="text-gray-700 mb-4">Your pickup request has been successfully submitted.</p>

    <div class="mt-6">
      
      <p class="text-sm text-gray-500">You will receive a confirmation email shortly.</p>
    </div>
  </div>
</template>

<style scoped>
img {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
}

strong {
  color: #111827; /* slightly darker for contrast */
}
</style>

