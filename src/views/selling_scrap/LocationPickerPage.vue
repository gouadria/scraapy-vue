<script setup lang="ts">
import { ref } from 'vue';
import ProgressBar from '@/components/selling_scrap/ProgressBar.vue';
import LocationPicker from '@/components/selling_scrap/LocationPicker.vue';
import ScheduleSelector from '@/components/selling_scrap/ScheduleSelector.vue';
import NavBar from '@/components/UIElements/navBar.vue';
import AppFooter from '@/components/UIElements/footerComponant.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentProgress = ref(70);

const goBack = () => {
  router.go(-1); // revenir à la page précédente
};

const goNext = () => {
  router.push('/info-bank'); // aller à la page infoBank.vue
};
</script>

<template>
  <div class="location-picker-page">
    <NavBar />
    
    <main>
      <div class="container">
        <h1>Sell Scrap</h1>
        
        <ProgressBar :progress="currentProgress" />
        
        <div class="content-card">
          <LocationPicker />
          <ScheduleSelector />

          <!-- Boutons de navigation ajoutés ici -->
          <div class="navigation-buttons">
            <button @click="goBack" class="nav-button previous">Previous</button>
            <button @click="goNext" class="nav-button next">Next</button>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.location-picker-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
}

main {
  flex: 1;
  padding: 24px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 24px;
  font-size: 1.8rem;
}

.content-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-top: 24px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.nav-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.previous {
  background-color: #f0f0f0;
  color: #333;
}

.previous:hover {
  background-color: #e0e0e0;
}

.next {
  background-color: #00A67E;
  color: white;
}

.next:hover {
  background-color: #008c6a;
}
</style>
