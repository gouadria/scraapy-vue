<template>
  <ul class="list_details">
    <li v-for="(item, index) in details" :key="index">
      <component :class="item.parentClass ? item.parentClass : ''" :is="item.iconUrl" />
      <p v-if="item.label">{{ item.label }}</p>
      <div>
        <p :class="item.parentClass ? item.parentClass : ''">{{ item.value }}</p>
        <p v-if="item.valueTow">{{ item.valueTow }}</p>
        <span>{{ item.span }}</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import boxComponent from '@/components/UIElements/boxComponent.vue'
interface DetailItem {
  label?: string
  value?: string | number
  valueTow?: string | number
  iconUrl?:  any
  span?: string
  parentClass?: string
}
export default defineComponent({
  name: 'OrderDetails',
  components: { boxComponent },
  props: {
    details: {
      type: Array as PropType<DetailItem[]>,
      required: true
    }
  },
  methods: {}
})
</script>

<style scoped>
.list_details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
}
.list_details li {
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
}

.list_details li div {
  display: flex;
  gap: 6px;
  align-items: center;
}

.list_details li div p {
  font-size: 16px;
  font-weight: 600;
  color: #4f4f4f;
}
.list_details li div span {
  font-size: 14px;
  font-weight: 400;
  color: #b0b0b0;
}
</style>
