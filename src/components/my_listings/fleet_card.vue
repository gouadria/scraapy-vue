<script lang="ts">
import type { PropType, Component } from 'vue'
export default {
  name: 'FleetCard',
  props: {
    vehicleNumber: {
      type: String,
      required: true
    },
    vehicleName: {
      type: String,
      required: true
    },
    icon: {
      type: String as PropType<Component>,
      required: true
    },
    removeFleetCard: {
      type: Function as PropType<() => void>,
      required: true
    },
    editFleet: {
      type: Function as PropType<() => void>,
      required: true
    }
  }
}
</script>
<template>
  <div class="fleet_card_container">
    <div class="fleet_card_header">
      <div class="fleet_number_name">
        <h1>{{ vehicleNumber }}</h1>
        <h2>{{ vehicleName }}</h2>
      </div>
      <component :is="icon" @click="removeFleetCard" class="icon"></component>
    </div>
    <div class="fleet_card_view_details" @click="editFleet">
      <h1>View / Edit Details</h1>
    </div>
  </div>
</template>

<style scoped>
.fleet_card_container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  justify-items: flex-start;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
}

.fleet_card_header {
  display: flex;
  justify-content: space-between;
}
.fleet_card_header .icon {
  cursor: pointer;
}
.fleet_number_name h1 {
  color: var(--Primary---700, #136a83);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
}

.fleet_number_name h2 {
  color: var(--Secondary---500, #15b377);
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.fleet_card_view_details h1 {
  color: #136a83;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
