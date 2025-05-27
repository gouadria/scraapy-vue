<script setup lang="ts">
import NavBar from '@/components/UIElements/navBar.vue';
import SellScrapForm from '@/components/selling_scrap/SellScrapForm.vue';
import AppFooter from '@/components/UIElements/footerComponant.vue';
</script>

<template>
  <div class="app-container">
    <NavBar />
    <main>
      <div class="container">
        <SellScrapForm />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 24px 0;
  background-color: var(--neutral-50);
}

@media (max-width: 768px) {
  main {
    padding: 16px 0;
  }
}
</style>