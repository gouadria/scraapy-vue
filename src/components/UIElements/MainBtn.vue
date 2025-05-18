<template>
  <button
    :class="{
      'green-btn': type === 'green',
      'white-btn': type === 'white',
      'blue-btn': type === 'blue',
      'red-btn': type === 'red',
      'delete-btn': type === 'delete',
      'cancel-btn': type === 'cancel',
      'edit-btn': type === 'edit-btn',
      disabled: disabled
    }"
  >
    <slot></slot>
    <img v-if="type === 'edit-btn'" src="@/assets/svg-icons/edit.svg?url" alt="edit" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MainBtn',
  props: {
    type: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
button {
  display: flex;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  border-radius: 8px;
  padding: 10px 14px;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  white-space: nowrap;
  user-select: none;
}

button.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.green-btn {
  border: 1px solid var(--Secondary---500, #15b377);
  background: var(--Secondary---500, #15b377);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: var(--White, #fff);
}

.white-btn {
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: var(--Dark-700, #4f4f4f);
}

.delete-btn {
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: var(--error, #f04438);
}

.edit-btn {
  padding: 8px;
  color: var(--Dark-700, #4f4f4f);
  gap: 8px;
}

.blue-btn {
  border: unset;
  background: var(--Primary---700, #136a83);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: var(--White, #fff);
}

.cancel-btn {
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: #f04438;
}

.red-btn {
  border: 1px solid #f04438;
  background: #f04438;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: var(--White, #fff);
}
</style>
