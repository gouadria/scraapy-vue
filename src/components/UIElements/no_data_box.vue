<script lang="ts">
import type { PropType, Component } from 'vue'

export default {
  name: 'NoDataBox',
  props: {
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: false,
      nullable: true
    },
    icon: {
      type: Object as PropType<Component>,
      required: false,
      nullable: true
    },
    buttonType: {
      type: String,
      required: false,
      nullable: true
    },
    buttonClick: {
      type: Function as PropType<() => void>,
      required: false,
      nullable: true
    }
  }
}
</script>

<template>
  <div class="box">
    <component class="title_icon" :is="icon"></component>
    <p>{{ title }}</p>
    <button
      v-if="buttonText"
      class="common_button_default"
      :class="{
        common_button_extra_small: buttonType === 'XS',
        common_button_default: buttonType === 'S',
        common_button_medium: buttonType === 'M',
        common_button_large: buttonType === 'L',
        common_button_extra_large: buttonType === 'XL'
      }"
      @click="buttonClick"
    >
      <img src="@/assets/documents_svg/plus.svg?url" alt="plus icon" />
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.title_icon {
  display: fl;
  width: 60px;
  height: 60px;
}

.box > p {
  font-size: 16px;
  font-weight: 600;
  color: var(--color344054);
}
.common_button_default {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  background-color: #15b377;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #15b377;
  line-height: 18px;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
.english .common_button_default {
  font-weight: 600;
}
</style>
