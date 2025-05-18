<template>
  <div class="toggle_question">
    <div class="question_box"></div>

    <div class="toggle_button" :class="{ toggle_button_on: isActive }" @click="toggle">
      <div class="circle"></div>
    </div>
    <div class="question_text">{{ ToggleName }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'ToggleButton',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    onToggle: {
      type: Function as PropType<(newValue: boolean) => void>,
      required: false
    },
    ToggleName: {
      type: String,
      required: false
    }
  },
  emits: ['update:isActive'],
  methods: {
    toggle() {
      const newValue = !this.isActive
      this.$emit('update:isActive', newValue)
      if (this.onToggle) {
        this.onToggle(newValue)
      }
    }
  }
})
</script>

<style scoped>
.toggle_question {
  display: flex;
  align-items: center;
  gap: 8px;
}
.question_text {
  font-size: 14px;
  font-weight: 500;
  color: #4f4f4f;
}
.toggle_button {
  display: flex;
  justify-content: flex-start;
  background-color: #e7e7e7;
  padding: 2px;
  border-radius: 50px;
  width: 44px;
  transition: all 0.5s ease;
  cursor: pointer;
}

.toggle_button_on {
  justify-content: flex-end;
  background-color: #15b377;
}

.circle {
  border-radius: 50px;
  width: 20px;
  height: 20px;
  background-color: white;
  transition: all 0.5s ease;
}
</style>
