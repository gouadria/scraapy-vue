<template>
  <div class="toggle_container">
    <label class="toggle_label">{{ label }}</label>
    <div class="toggle_buttons">
      <div
        class="toggle_button"
        @click="toggle(true)"
        :class="{ toggle_button_on: isActive }"
      >
        <span>{{ optionOne }}</span>
      </div>
      <div
        class="toggle_button"
        @click="toggle(false)"
        :class="{ toggle_button_on: !isActive }"
      >
        <span>{{ optionTwo }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AppToggle',
  props: {
    label: {
      type: String,
      required: true
    },
    optionOne: {
      type: String,
      default: 'Yes'
    },
    optionTwo: {
      type: String,
      default: 'No'
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isActive = computed({
      get: () => props.modelValue,
      set: (value: boolean) => emit('update:modelValue', value)
    })

    const toggle = (value: boolean) => {
      isActive.value = value
    }

    return {
      isActive,
      toggle
    }
  }
})
</script>

<style scoped>
.toggle_container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}

.toggle_label {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.toggle_buttons {
  display: flex;
  gap: 2px;
  flex-direction: row;
  border-radius: 8px;
  border: 1px solid #eaecf0;
  padding: 4px;
  cursor: pointer;
}

.toggle_button {
  display: flex;
  border-radius: 5px;
  color: black;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
}

.toggle_button_on {
  color: white;
  background: var(--Primary---700, #136a83);
}

.input_error .toggle_buttons {
  border-color: red;
}

.toggle_container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}

.toggle_label {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.toggle_buttons {
  display: flex;
  gap: 2px;
  flex-direction: row;
  border-radius: 8px;
  border: 1px solid #eaecf0;
  padding: 4px;
  cursor: pointer;
}

.toggle_button {
  display: flex;
  border-radius: 5px;
  color: black;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
}

.toggle_button_on {
  color: white;
  background: var(--Primary---700, #136a83);
}

.input_error .toggle_buttons {
  border-color: red;
}
</style>
