<template>
  <div
    class="certificate_container"
    v-auto-animate
    :class="{ certificate_container_checked: isChecked }"
    @click="toggleCheckbox"
  >
    <div class="certificate_checkbox">
      <inputField
        type="checkbox"
        :value="isChecked"
        :checked="isChecked"
        @update="toggleCheckbox"
      />
    </div>
    <div class="certificate_heading" v-auto-animate>
      <div class="heading">
        <h1>{{ title }}</h1>
        <component :is="infoIcon"></component>
      </div>
      <p v-show="isChecked">{{ subTitle }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import inputField from '../UIElements/inputField.vue'
export default defineComponent({
  name: 'CertificateCheckbox',
  components: { inputField },
  props: {
    title: { type: String, default: 'Default Title' },
    subTitle: { type: String, default: 'Default Subtitle' },
    infoText: String,
    isChecked: { type: Boolean, required: true },
    infoIcon: String
  },
  emits: ['update:isChecked'],
  methods: {
    toggleCheckbox() {
      const newValue = !this.isChecked
      this.$emit('update:isChecked', newValue)
    },
    // handleCheckboxChange(event: Event) {
    //   const isChecked = (event.target as HTMLInputElement).checked
    //   this.$emit('update:isChecked', isChecked)
    // }
  }
})
</script>
<style scoped>
.certificate_container {
  width: 100%;
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  cursor: pointer;
}
.certificate_container_checked {
  border: 1px solid var(--Secondary---500, #15b377);
}

.certificate_checkbox span {
  background: red;
}

.checkbox {
  width: 16px;
  height: 16px;
  border: 2px solid var(--Dark-100, #e7e7e7);
  border-radius: 4px;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.checkbox:checked {
  border: 1px solid var(--Secondary---500, #15b377);
  background: var(--Secondary---500, #15b377);
  background-image: url('@/assets/svg-icons/check_icon.svg?url');
  background-size: 10px 10px;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px;
}

.certificate_heading h1 {
  color: var(--Dark-950, #121212);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.certificate_heading p {
  color: var(--Dark-700, #4f4f4f);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}
</style>
