<script lang="ts">
import type { PropType, Component } from 'vue'

export default {
  name: 'CommonChip',
  components: {},
  props: {
    text: {
      type: String,
      required: true
    },
    chipType: {
      type: String,
      required: false,
      nullable: true
    },
    icon: {
      type: Object as PropType<Component>,
      required: false,
      nullable: true
    },
    circle: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<template>
  <div
    class="chip"
    :class="{
      chip_red: chipType === 'CANCELLED',
      chip_green: chipType === 'WITHTENANT' || chipType === 'READY' || chipType === 'COMPLETE',
      chip_orange: chipType === 'PENDING' || chipType === 'REVIEWING',
      chip_dark_blue: chipType === 'ACCEPTED' || chipType === 'PREPARING',
      chip_full_green: chipType === 'COMPLETED',
      chip_full_red: chipType === 'REJECTED',
      chip_little_green: chipType === 'SHIPPED',
      chip_white_green: chipType === 'PAID',
      chip_white_red: chipType === 'NOTPAID',
      chip_off_green:
        chipType === 'HANDOFF' || chipType === 'RECEIVED' || chipType === 'INSPECTING',
      circle: circle === true,
      complete: chipType === 'COMPLETE',
      petroli_chip: chipType === 'OBTAINED'
    }"
  >
    <div
      class="dot"
      :class="{
        dot_red: chipType === 'CANCELLED',
        dot_green:
          chipType === 'WITHTENANT' ||
          chipType === 'READY' ||
          chipType === 'SHIPPED' ||
          chipType === 'HANDOFF' ||
          chipType === 'RECEIVED' ||
          chipType === 'INSPECTING',
        dot_orange: chipType === 'PENDING' || chipType === 'REVIEWING',
        dot_dark_blue: chipType === 'ACCEPTED' || chipType === 'PREPARING',
        dot_white_green: chipType === 'PAID',
        dot_white_red: chipType === 'NOTPAID',
        dot_patroli: chipType === 'OBTAINED'
      }"
    ></div>
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
.chip {
  display: inline-flex;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 2px 8px;
  gap: 6px;
  border-radius: 10px;
  border: 1px solid #f79009;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  justify-content: center;
  align-items: center;
}
.chip p {
  font-size: 14px;
  font-weight: 500;
}
.chip.circle {
  border-radius: 16px;
}

.chip_red {
  color: #f04438;
  border: 1px solid #f04438;
}

.chip_green {
  color: #15b377;
  border: 1px solid #15b377;
}

.chip_orange {
  color: #f79009;
  border: 1px solid #f79009;
}

.chip_dark_blue {
  color: #136a83;
  border: 1px solid #136a83;
}

.chip_full_green {
  background-color: #15b377;
  border: 1px solid #15b377;
  color: white;
}

.chip_full_red {
  background-color: #f04438;
  border: 1px solid #f04438;
  color: white;
}
.chip_white_red {
  background-color: #fef3f2;
  border: 1px solid #f04438;
  color: #f04438;
}
.chip_little_green {
  color: #15b377;
  border: 1px solid #15b377;
  background-color: #edfcf4;
}
.chip_white_green {
  color: #15b377;
  border: 1px solid #15b377;
  background-color: #d2f9e3;
}
.chip_off_green {
  color: #15b377;
  border-radius: 10px;
  border: 1px solid #15b377;
  background: #d2f9e3;
}
.petroli_chip {
  color: #15b377;
  border-radius: 10px;
  border: 1px solid #136a83;
  background: #136a83;
  color: #fff;
}
.dot_patroli {
  background-color: #fff;
}
.complete {
  color: #fff;
  border-radius: 10px;
  border: 1px solid #15b377;
  background: #15b377;
}
.dot {
  min-width: 8px;
  min-height: 8px;
  background-color: white;
  border-radius: 50%;
}

.dot_white_red,
.dot_red {
  background-color: #f04438;
}

.dot_green {
  background-color: #15b377;
}

.dot_orange {
  background-color: #f79009;
}

.dot_dark_blue {
  background-color: #136a83;
}
.dot_white_green {
  background-color: #15b377;
}
</style>
