<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/UIElements/navBar.vue';
import SellScrapForm from '@/components/selling_scrap/SellForm.vue';
import AppFooter from '@/components/UIElements/footerComponant.vue';

const progress = ref(100);
const isAccountCreated = ref(false);
const userData = ref({ fullName: '', email: '' });

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
      </div>
    </main>

    <AppFooter />
  </div>
</template>