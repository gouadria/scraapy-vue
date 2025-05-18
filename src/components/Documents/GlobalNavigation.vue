<template>
  <div class="global_nav">
    <button @click="goBackToList">
      <img src="@/assets/documents_svg/chevron-down.svg?url" alt="arrowIcon" loading="lazy" />
    </button>
    <div class="data">
      <span>{{ title }}</span>
      <h2>{{ renterName.slice(0, 8) }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    renterName: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    goBackToList() {
      this.$emit('goBackToList')
    }
  }
})
</script>
<style scoped>
.global_nav {
  display: flex;
  padding: 16px 24px;
  align-items: center;
  gap: 12px;
}
.data {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.global_nav .data span {
  font-size: 14px;
  font-weight: 400;
  color: #475467;
}
.global_nav .data h2 {
  font-size: 24px;
  font-weight: 600;
  color: #101828;
}
.global_nav button {
  display: none;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  background: #f2f4f7;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.global_nav button img {
  transform: rotate(90deg);
}
.english .global_nav button img {
  transform: rotate(-90deg);
}
@media (max-width: 1200px) {
  .global_nav button {
    display: flex;
  }
}
</style>
