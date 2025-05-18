<script lang="ts">
import { defineComponent } from 'vue'
import { Item } from '@/models/Item'

export default defineComponent({
  name: 'SellerInfo',
  props: {
    item: {
      type: Object as () => Item,
      required: true
    }
  },
  mounted() {
    console.log(this.item)
  }
})
</script>
<template>
  <div v-if="!item"></div>
  <div class="seller-info-container" v-else>
    <div class="soldBy">
      <img src="@/assets/svg-icons/soldBy.svg?url" alt="spld by icon" />
      <span>{{ $t('product.SoldBy') }}</span>
    </div>

    <div class="divider"></div>
    <div class="seller-info-wrapper">
      <div class="seller-info">
        <img v-if="item.owner_image" :src="item.owner_image" alt="Vendor Logo" />
        <div v-else class="no_img">
          <img src="@/assets/svg-icons/account_icon.svg?url" alt="no user logo icon" />
        </div>
      </div>
      <div class="seller-name">
        <span>{{ item.owner_name }}</span>
        <!-- <span>Bahad Trading Private Ltd.</span> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.seller-info-container {
  display: flex;
  padding: 15px 0px;
  flex-direction: column;
  gap: 15px;
  border-radius: 20px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  width: 100%;
  max-width: 490px;
}

.seller-info-container span {
  color: #121212;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.soldBy {
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 0 20px;
}

.seller-info-wrapper {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 0 20px;
}

.seller-info {
  display: flex;
  gap: 10px;
  width: 48px;
  height: 48px;
  align-items: center;
}

.seller-info img {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.seller-name {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.seller-name span:nth-child(1) {
  font-size: 16px;
}

.seller-name span:nth-child(2) {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.no_img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid#E7E7E7;
  padding: 6px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
</style>
