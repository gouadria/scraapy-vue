<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
  update: [otp: string[]];
}>();

const otpLength = 6;
const otpArray = ref(Array(otpLength).fill(''));
const otpInputRefs = ref<HTMLInputElement[]>([]);

const focusIndex = ref(0);

function handleInput(index: number, event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  if (value.length > 1) {
    otpArray.value[index] = value.slice(-1);
  } else {
    otpArray.value[index] = value;
  }

  if (value && index < otpLength - 1) {
    focusIndex.value = index + 1;
    otpInputRefs.value[index + 1].focus();
  }

  emit('update', otpArray.value);
}

function handleKeyDown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !otpArray.value[index] && index > 0) {
    focusIndex.value = index - 1;
    otpInputRefs.value[index - 1].focus();
    otpArray.value[index - 1] = '';
    emit('update', otpArray.value);
  } else if (event.key === 'ArrowLeft' && index > 0) {
    focusIndex.value = index - 1;
    otpInputRefs.value[index - 1].focus();
  } else if (event.key === 'ArrowRight' && index < otpLength - 1) {
    focusIndex.value = index + 1;
    otpInputRefs.value[index + 1].focus();
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault();
  const pasteData = event.clipboardData?.getData('text') || '';

  const digits = pasteData.replace(/\D/g, '').slice(0, otpLength);

  for (let i = 0; i < digits.length; i++) {
    otpArray.value[i] = digits[i];
  }

  const nextEmptyIndex = otpArray.value.findIndex(val => !val);
  const indexToFocus = nextEmptyIndex !== -1 ? nextEmptyIndex : otpLength - 1;

  focusIndex.value = indexToFocus;
  otpInputRefs.value[indexToFocus].focus();

  emit('update', otpArray.value);
}

watch(() => otpInputRefs.value.length, (newLength) => {
  if (newLength === otpLength && otpInputRefs.value[0]) {
    otpInputRefs.value[0].focus();
  }
}, { immediate: true });
</script>

<template>
  <div class="otp-container">
    <template v-for="(_, index) in otpArray" :key="index">
      <input
        type="text"
        maxlength="1"
        inputmode="numeric"
        pattern="[0-9]*"
        v-model="otpArray[index]"
        @input="handleInput(index, $event)"
        @keydown="handleKeyDown(index, $event)"
        @paste="handlePaste($event)"
        :ref="el => otpInputRefs[index] = el"
        :class="{ filled: otpArray[index] !== '' }"
      />
    </template>
  </div>
</template>

<style>
.otp-container {
  display: flex;
  justify-content: start;
  gap: 12px;
  margin: 24px 0;
}

.otp-container input {
  width: 48px;
  height: 48px;
  font-size: 24px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s, background-color 0.3s;
  outline: none;
  user-select: text;
}

.otp-container input:focus {
  border-color: #22c55e; /* vert */
  background-color: #f0fff4;
  box-shadow: 0 0 5px rgba(34, 197, 94, 0.7);
}

.otp-container input.filled {
  border-color: #22c55e;
  background-color: #e6ffe8;
}
</style>
