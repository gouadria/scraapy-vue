<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const estimatedAmount = ref(0)
const currency = ref('SAR')

// Simule un appel à ton API (optionnel si tu ne l’utilises pas)
const fetchCategories = async () => {
  const res = await fetch(import.meta.env.VITE_API_URL + 'api/inventory/home/')
  const data = await res.json()
  return data.data.categories.product.flatMap(group => group.categories)
}

const calculateEstimatedAmount = async () => {
  const storedItems = localStorage.getItem('scrapItems')
  if (!storedItems) {
    console.warn('No scrap items in localStorage.')
    return
  }

  const selectedItems = JSON.parse(storedItems)
  console.log('Selected Items:', selectedItems)

  const allCategories = await fetchCategories()
  console.log('All categories:', allCategories)

  let total = 0
  for (const item of selectedItems) {
    const category = allCategories.find(cat =>
  (item.categoryId && Number(cat.id) === Number(item.categoryId)) ||
  cat.name?.toLowerCase() === item.name?.toLowerCase()
)

    if (category) {
      const price = parseFloat(category.price_unit) || 0
      const quantity = Number(item.quantity) || 0
      console.log(`Item: ${item.name}, price: ${price}, qty: ${quantity}`)
      total += price * quantity
    } else {
      console.warn(`No matching category found for item ${item.name} with ID ${item.categoryId}`)
    }
  }

  estimatedAmount.value = total
}


onMounted(() => {
  calculateEstimatedAmount()
})
watch(estimatedAmount, (newVal) => {
  localStorage.setItem('estimatedAmount', newVal.toString())
})



</script>



<template>
  <div class="estimation-container">
    <div class="estimation-header">
      <div class="estimation-icon">💰</div>
      <div class="estimation-label">{{ t('selling_scrap.moneyWillReceive') }}<span class="money-text"></span></div>
    </div>
    
    <div class="amount-container">
      <div class="amount">{{ estimatedAmount.toLocaleString() }}</div>
      <img src="@/assets/svg-icons/sar.svg" width="30" height="30"/>
      <!-- @/assets/svg-icons/sar.svg -->
    </div>
    
    <div class="disclaimer">
      {{ t('selling_scrap.dMoneyWillReceive') }}
    </div>
  </div>
</template>

<style scoped>
.estimation-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 24px 0;
}

.estimation-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.estimation-icon {
  font-size: 24px;
}

.estimation-label {
  font-size: 16px;
  color: #333;
}

.money-text {
  color: #18A77A;
  font-weight: 600;
}

.amount-container {
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
}

.currency {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-right: 8px;
}

.amount {
  font-size: 36px;
  font-weight: 700;
  color: #18A77A;
  border-bottom: 2px solid #18A77A;
  padding-bottom: 4px;
}

.disclaimer {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>