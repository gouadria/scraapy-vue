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

  console.log("📥 Récupération des données depuis localStorage...");

  const pickupAddress = localStorage.getItem("pickupAddress") || '';
  const bankInfoRaw = localStorage.getItem("bankInfo") || "{}";
  let bankInfo = {};
  try {
    bankInfo = JSON.parse(bankInfoRaw);
  } catch (err) {
    console.error("❌ Erreur parsing bankInfo:", err, bankInfoRaw);
  }

  const scrapItemsRaw = localStorage.getItem("scrapItems") || "[]";
  let scrapItems = [];
  try {
    scrapItems = JSON.parse(scrapItemsRaw);
  } catch (err) {
    console.error("❌ Erreur parsing scrapItems:", err, scrapItemsRaw);
  }

  const imagesRaw = localStorage.getItem("images") || "[]";
  let imagesWithPrefix = [];
  try {
    imagesWithPrefix = JSON.parse(imagesRaw);
  } catch (err) {
    console.error("❌ Erreur parsing images:", err, imagesRaw);
  }

  const selectedCategoryId = localStorage.getItem("selectedCategoryId") || '';

  const userType = localStorage.getItem("user_type") || ''; // Assure-toi que c'est bien stocké en localStorage
  const phone = localStorage.getItem("userPhone") || ''; // pareil

  const scrapItem = scrapItems[0] || {};

  // Affiche toutes les données pour debug
  console.log({
    selectedCategoryId,
    scrapItem,
    formEmail: formData.email,
    userType,
    phone,
    pickupAddress,

    bankInfo,
    imagesWithPrefixLength: imagesWithPrefix.length,
  });

  // Validation des données obligatoires
  if (!selectedCategoryId) {
    console.error("⚠️ selectedCategoryId manquant !");
    alert("Données obligatoires manquantes : catégorie");
    return;
  }
  if (!scrapItem.name) {
    console.error("⚠️ scrapItem.name manquant !");
    alert("Données obligatoires manquantes : nom du produit");
    return;
  }
  if (!formData.email) {
    console.error("⚠️ email manquant !");
    alert("Données obligatoires manquantes : email");
    return;
  }
  if (!userType) {
    console.error("⚠️ userType manquant !");
    alert("Données obligatoires manquantes : type utilisateur");
    return;
  }
  if (!phone) {
    console.error("⚠️ phone manquant !");
    alert("Données obligatoires manquantes : téléphone");
    return;
  }
  if (!pickupAddress) {
    console.error("⚠️ pickupAddress manquant !");
    alert("Données obligatoires manquantes : adresse de ramassage");
    return;
  }
 
  // Construction du FormData
  const fd = new FormData();
  fd.append("category_group", selectedCategoryId);
  fd.append("name", scrapItem.name);
  fd.append("size", scrapItem.size || "");
  fd.append("quantity", String(scrapItem.quantity ?? ""));
  fd.append("description", scrapItem.description?.trim() || "Pas de description fournie");
  fd.append("pickup_address", pickupAddress);

  fd.append("email", formData.email);
  fd.append("user_type", userType);
  fd.append("phone", phone);

  if (bankInfo.accountHolderName) {
    fd.append("banking_info.full_name", bankInfo.accountHolderName);
  } else {
    console.warn("⚠️ bankInfo.accountHolderName manquant");
  }
  if (bankInfo.selectedBank) {
    fd.append("banking_info.bank_name", bankInfo.selectedBank);
  } else {
    console.warn("⚠️ bankInfo.selectedBank manquant");
  }
  if (bankInfo.ibanNumber) {
    fd.append("banking_info.iban_number", bankInfo.ibanNumber);
  } else {
    console.warn("⚠️ bankInfo.ibanNumber manquant");
  }
  

  if (!imagesWithPrefix.length) {
    console.warn("⚠️ Aucun fichier image trouvé.");
  } else {
    imagesWithPrefix.forEach((dataUrl: string, idx: number) => {
      const base64 = dataUrl.split(",")[1];
      if (base64) {
        const blob = base64ToBlob(base64);
        const file = new File([blob], `image_${idx}.jpg`, { type: blob.type });
        fd.append("images", file);
      } else {
        console.warn(`⚠️ Image à l'index ${idx} n'a pas de base64 valide.`);
      }
    });
  }

  console.log("🚀 Envoi des données au backend...");
fetch(import.meta.env.VITE_API_URL + "api/sms/create-scrap-item/", {
  method: "POST",
  credentials: "include",
  body: fd,
})
  .then(async res => {
    const text = await res.text();
    console.log("📨 Réponse brute :", text);
    if (!res.ok) {
      throw new Error(`Erreur HTTP ${res.status}`);
    }
    // Essaye de parser si possible
    try {
      const data = JSON.parse(text);
      console.log("✅ Réponse JSON :", data);
    } catch (e) {
      console.error("❌ Réponse non-JSON :", e, text);
    }
  })
  .catch(err => {
    console.error("❌ Erreur lors de l'envoi :", err);
  });

}
// Convertit une chaîne Base64 en Blob
function base64ToBlob(b64: string): Blob {
  const byteString = atob(b64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
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
