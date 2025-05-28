<script setup lang="ts">
import { ref } from 'vue';

import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import SellScrapForm from '@/components/selling_scrap/SellForm.vue';
import NavigationButtons from '@/components/selling_scrap/NavigationButtons.vue';

const progress = ref(100);
const isAccountCreated = ref(false);
const userData = ref({ fullName: '', email: '' });

import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const handleFormSubmit = (formData: { fullName: string; email: string }) => {
  userData.value = formData;
  isAccountCreated.value = true;

  // Récupération des données dans localStorage
  const pickupAddress = localStorage.getItem("pickupAddress") || '';
  const estimatedAmount = localStorage.getItem("estimatedAmount") || '0';

  const bankInfoRaw = localStorage.getItem("bankInfo") || "{}";
  let bankInfo = {};
  try {
    bankInfo = JSON.parse(bankInfoRaw);
  } catch (err) {
    console.error("Erreur parsing bankInfo:", err, bankInfoRaw);
  }

  const scrapItemsRaw = localStorage.getItem("scrapItems") || "[]";
  let scrapItems = [];
  try {
    scrapItems = JSON.parse(scrapItemsRaw);
  } catch (err) {
    console.error("Erreur parsing scrapItems:", err, scrapItemsRaw);
  }

  const imagesRaw = localStorage.getItem("images") || "[]";
  let imagesWithPrefix = [];
  try {
    imagesWithPrefix = JSON.parse(imagesRaw);
  } catch (err) {
    console.error("Erreur parsing images:", err, imagesRaw);
  }

  const selectedCategoryId = localStorage.getItem("selectedCategoryId") || '';

  const userType = localStorage.getItem("user_type") || '';
  const phone = localStorage.getItem("userPhone") || '';

  if (!selectedCategoryId || !formData.email || !userType || !phone || !pickupAddress) {
    alert("Données obligatoires manquantes !");
    return;
  }

  // Fonction utilitaire conversion base64 -> Blob
  function base64ToBlob(b64: string): Blob {
    const byteString = atob(b64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }

  // Envoi de chaque scrapItem (avec mêmes images pour tous)
  scrapItems.forEach((scrapItem, index) => {
    const fd = new FormData();

    fd.append("category_group", selectedCategoryId);
    fd.append("name", scrapItem.name);
    fd.append("size", scrapItem.size || "");
    fd.append("quantity", String(scrapItem.quantity ?? ""));
    fd.append("description", scrapItem.description?.trim() || "Pas de description fournie");
    fd.append("pickup_address", pickupAddress);
    fd.append("total", estimatedAmount);

    fd.append("email", formData.email);
    fd.append("user_type", userType);
    fd.append("phone", phone);

   if (bankInfo.accountHolderName && bankInfo.accountHolderName.trim() !== '') {
  fd.append("banking_info.full_name", bankInfo.accountHolderName.trim());
} else {
  alert("Le nom du titulaire du compte est requis.");
 
}
    if (bankInfo.selectedBank) {
      fd.append("banking_info.bank_name", bankInfo.selectedBank);
    }
    if (bankInfo.ibanNumber) {
      fd.append("banking_info.iban_number", bankInfo.ibanNumber);
    }

    if (imagesWithPrefix.length) {
      imagesWithPrefix.forEach((dataUrl: string, idx: number) => {
        const base64 = dataUrl.split(",")[1];
        if (base64) {
          const blob = base64ToBlob(base64);
          const file = new File([blob], `image_${index}_${idx}.jpg`, { type: blob.type });
          fd.append("images", file);
        }
      });
    }

    fetch(import.meta.env.VITE_API_URL + "api/sms/create-scrap-item/", {
      method: "POST",
      credentials: "include",
      body: fd,
    })
    .then(async res => {
      const text = await res.text();
      console.log(`Réponse scrapItem ${index}:`, text);
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
      try {
        const data = JSON.parse(text);
        console.log("Réponse JSON:", data);
      } catch(e) {
        console.warn("Réponse non JSON");
      }
    })
    .catch(err => {
      console.error("Erreur envoi scrapItem:", err);
    });
  });
}
</script>

<template>
  <div class="app">
    <navBar />
    <main class="main-content">
      <div class="scrap-selection">
        <div class="selection-header">
          <h1 class="selection-title">{{ t('selling_scrap.sell_scrap') }}</h1>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <span class="progress-text">{{ progress }}%</span>
          </div>
        </div>

        <template v-if="!isAccountCreated">
          <SellScrapForm @submit="handleFormSubmit" />
        </template>
        <template v-else>
          <div class="text-green-600 text-lg font-semibold">
            ✅ Vos informations ont été envoyées avec succès !
          </div>
        </template>
        
      </div>
    </main>
    <footerComponant />
  </div>
</template>

<style scoped>
  .scrap-selection {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .selection-header {
    padding: 24px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .selection-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .progress-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .progress-bar {
    width: 200px;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: #16b277;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 14px;
    font-weight: 500;
    color: #666;
  }

  .selection-content {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 32px;
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .step-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #16b277;
    color: white;
  }

  .step-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .accent {
    color: #16b277;
  }

  .scrap-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @media (max-width: 992px) {
    .scrap-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .scrap-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .progress-bar {
      width: 150px;
    }
  }

  @media (max-width: 576px) {
    .scrap-grid {
      grid-template-columns: 1fr;
    }
    
    .selection-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .progress-container {
      width: 100%;
    }
    
    .progress-bar {
      flex: 1;
    }
  }
</style>