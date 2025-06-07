<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/UIElements/NavBar.vue'
import SellScrapForm from '@/components/selling_scrap/SellForm.vue'
import AppFooter from '@/components/UIElements/FooterComponant.vue'; // Mise à jour du nom

const progress = ref(100)
const isAccountCreated = ref(false)
const userData = ref({ fullName: '', email: '' })
const errorMessage = ref<string | null>(null)

const handleFormSubmit = async (formData: { fullName: string; email: string }) => {
  userData.value = formData;
  isAccountCreated.value = true;

  const pickupAddress = localStorage.getItem("pickupAddress") || '';
  const estimatedAmount = localStorage.getItem("estimatedAmount") || '0';
  let bankInfo = {};
  try {
    bankInfo = JSON.parse(localStorage.getItem("bankInfo") || "{}");
  } catch (err) {
    console.error("Erreur parsing bankInfo:", err);
  }

  let scrapItems = [];
  try {
    scrapItems = JSON.parse(localStorage.getItem("scrapItems") || "[]");
  } catch (err) {
    console.error("Erreur parsing scrapItems:", err);
  }

  let imagesWithPrefix = [];
  try {
    imagesWithPrefix = JSON.parse(localStorage.getItem("images") || "[]");
  } catch (err) {
    console.error("Erreur parsing images:", err);
  }

  const selectedCategoryId = localStorage.getItem("selectedCategoryId") || '';
  const userType = localStorage.getItem("user_type") || '';
  const phone = localStorage.getItem("userPhone") || '';

  if (!selectedCategoryId || !formData.email || !userType || !phone || !pickupAddress) {
    alert("Données obligatoires manquantes !");
    return;
  }

  function base64ToBlob(b64: string): Blob {
    const byteString = atob(b64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }

  // Envoi de chaque scrapItem
  for (const [index, item] of scrapItems.entries()) {
    const fd = new FormData();

    fd.append("category_group", selectedCategoryId);
    fd.append("name", item.name);
    fd.append("size", item.size || "");
    fd.append("quantity", String(item.quantity ?? ""));
    fd.append("description", item.description?.trim() || "Pas de description fournie");
    fd.append("pickup_address", pickupAddress);
    fd.append("total", estimatedAmount);

    fd.append("email", formData.email);
    fd.append("user_type", userType);
    fd.append("phone", phone);

    if (bankInfo.accountHolderName && bankInfo.accountHolderName.trim() !== '') {
      fd.append("banking_info.full_name", bankInfo.accountHolderName.trim());
    } else {
      alert("Le nom du titulaire du compte est requis.");
      return;
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
          const blob = base64ToBlob(dataUrl);
          const file = new File([blob], `image_${index}_${idx}.jpg`, { type: blob.type });
          fd.append("images", file);
        }
      });
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "api/sms/create-scrap-item/", {
        method: "POST",
          headers: {
    'Content-Type': ' Multipart/Form-Data',
  },
        body: fd,
         credentials: "include"
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erreur HTTP ${response.status}: ${text}`);
      }

      const result = await response.json();
      console.log("Réponse succès:", result);
    } catch (error) {
      console.error("Échec d’envoi:", error);
      errorMessage.value = "Impossible d’envoyer les données. Vérifiez la connexion ou essayez plus tard.";
    }
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavBar />

    <main class="flex-grow">
      <div class="container-custom py-8">
        <h1 class="text-2xl md:text-3xl font-bold mb-6">Sell Scrap</h1>
        <div class="max-w-2xl mx-auto">
          <template v-if="!isAccountCreated">
            <SellScrapForm @submit="handleFormSubmit" />
          </template>
          <template v-else>
            <div class="text-green-600 text-lg font-semibold">
              ✅ Vos informations ont été envoyées avec succès !
            </div>
          </template>
        </div>
        <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
      </div>
    </main>

    <AppFooter />
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
