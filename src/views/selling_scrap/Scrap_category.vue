<script setup lang="ts">
import NavBar from '@/components/UIElements/NavBar.vue';
import ScrapSelection from '@/components/selling_scrap/ScrapSelection.vue';
import AppFooter from '@/components/UIElements/footerComponant.vue';
</script>

<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <ScrapSelection />
    </main>
    <AppFooter />
  </div>
</template>

<style>
:root {
  --primary: #057970;
  --primary-dark: #046258;
  --primary-light: #e0f2f1;
  --secondary: #05393a;
  --accent: #f98a05;
  --success: #4caf50;
  --warning: #ff9800;
  --error: #f44336;
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --background: #f5f5f5;
  --surface: #ffffff;
  --border: #e0e0e0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--background);
  color: var(--text-primary);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 16px;
}
</style>