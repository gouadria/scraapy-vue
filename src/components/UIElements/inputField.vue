<script lang="ts">
import { defineComponent } from 'vue'
import DropDown from '@/components/UIElements/DropDown.vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import DatePickerInput from '@/components/UIElements/DatePickerInput.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import UploadFile from '@/components/UIElements/UploadFile.vue'
export default defineComponent({
  name: 'inputField',
  components: {
    DropDown,
    VueTelInput,
    DatePickerInput,
    UploadFile
  },
  data() {
    return {
      toggle: false
    }
  },
  props: {
    label: String,
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    labelImage: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    options: {
      type: Array as () => Array<{ value: string | number; label: string }>,
      default: () => []
    },
    required: Boolean,
    maxlength: Number,
    rows: {
      type: Number,
      default: 6
    },
    error: String,
    disabled: Boolean,
    datePickerProps: {
      type: Object,
      default: () => ({
        format: 'dd MMM, yyyy',
        type: 'number',
        enableTimePicker: false,
        isTime: false
      })
    }
  },
  emits: ['update', 'submit', 'validate', 'upload'],
  computed: {
    selectedValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update', value)
      }
    }
  },
  methods: {
    preventNonNumericInput(event) {
      // Allow control keys
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return
      }

      const allowedKeys = [
        'Backspace',
        'Tab',
        'Enter',
        'Escape',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
        'Home',
        'End'
      ]
      if (allowedKeys.includes(event.key)) {
        return
      }

      const current = event.target.value
      const next = current + event.key

      // Allow only if the next value is a valid number
      if (/^\d*\.?\d*$/.test(next)) {
        return
      } else {
        event.preventDefault()
      }
    },
    cardExpireInput(event) {
      if (event.key === 'Backspace') {
        if (event.target.value.length === 5) {
          event.target.value = event.target.value.slice(0, 3)
          return
        }
        return
      }
      if (event.key.match(/[^0-9/]/)) {
        event.preventDefault()
      }
      if (event.target.value.length === 2) {
        event.target.value += ' / '
      }
      if (event.target.value.length > 6) {
        event.preventDefault()
      }
    },
    cardNumberInput(event) {
      if (event.key === 'Backspace') {
        if (
          event.target.value.length === 5 ||
          event.target.value.length === 10 ||
          event.target.value.length === 15
        ) {
          event.target.value = event.target.value.slice(0, -1)
          return
        }
        return
      }
      if (event.key.match(/[^0-9]/)) {
        event.preventDefault()
      }
      if (
        event.target.value.length === 4 ||
        event.target.value.length === 9 ||
        event.target.value.length === 14
      ) {
        event.target.value += ' '
      }
      if (event.target.value.length >= 19) {
        event.preventDefault()
      }
    }
  }
})
</script>

<template>
  <div class="input-item" v-auto-animate>
    <label v-if="label && type !== 'checkbox'">
      <img v-if="labelImage" :src="labelImage" alt="label Icon" /> {{ label
      }}{{ required ? '*' : '' }}
    </label>

    <DropDown
      v-if="type === 'dropdown'"
      :options="options"
      v-model="selectedValue"
      :placeholder="placeholder"
      :class="{ 'input-error': error }"
      :disabled="disabled"
    />

    <label class="custom-checkbox" v-else-if="type === 'checkbox'">
      <input
        type="checkbox"
        :required="required"
        v-model="selectedValue"
        :disabled="disabled"
        autocomplete="off"
        aria-hidden="true"
      />
      <span class="checkmark"></span>
      <span v-if="label">{{ label }}{{ required ? '*' : '' }}</span>
    </label>

    <!-- Textarea Input -->
    <textarea
      class="input-textarea"
      v-else-if="type === 'textarea'"
      :placeholder="placeholder"
      :required="required"
      v-model="selectedValue"
      :class="{ 'input-error': error }"
      :maxlength="maxlength"
      :disabled="disabled"
      :rows="rows"
      autocomplete="off"
      aria-hidden="true"
    />

    <!-- Search Input -->
    <div class="search-input" v-else-if="type === 'search'">
      <img src="@/assets/svg-icons/searchIcon.svg?url" class="input-icon" alt="search icon" />
      <input
        type="text"
        autocomplete="off"
        aria-hidden="true"
        :placeholder="placeholder"
        v-model="selectedValue"
        :class="{ 'input-error': error }"
        :maxlength="maxlength"
        :disabled="disabled"
        @keyup.enter="$emit('submit', selectedValue)"
      />
    </div>

    <!-- Card Number Input -->
    <input
      v-else-if="type === 'cardNumber'"
      :type="text"
      autocomplete="off"
      aria-hidden="true"
      :placeholder="placeholder"
      :required="required"
      v-model="selectedValue"
      :class="{ 'input-error': error }"
      :maxlength="maxlength"
      :disabled="disabled"
      @keydown="cardNumberInput"
      @keyup.enter="$emit('submit', selectedValue)"
    />

    <!-- Expiry Date Input  -->
    <div class="expiry-date-input" v-else-if="type === 'expiryDate'">
      <img src="@/assets/svg-icons/calender.svg?url" alt="calender" />
      <input
        type="text"
        autocomplete="off"
        aria-hidden="true"
        :placeholder="placeholder"
        v-model="selectedValue"
        :class="{ 'input-error': error }"
        :maxlength="maxlength"
        :disabled="disabled"
        @keydown="cardExpireInput"
        @keyup.enter="$emit('submit', selectedValue)"
      />
    </div>

    <!-- CVC Code Input -->
    <div class="cvc-code-input" v-else-if="type === 'cvcCode'">
      <img src="@/assets/svg-icons/lockGrey.svg?url" alt="Security Code Icon" />
      <input
        type="text"
        autocomplete="off"
        aria-hidden="true"
        :placeholder="placeholder"
        v-model="selectedValue"
        :class="{ 'input-error': error }"
        :maxlength="maxlength"
        :disabled="disabled"
        @keyup.enter="$emit('submit', selectedValue)"
      />
    </div>

    <!-- Number Input -->
    <input
      v-else-if="type === 'number'"
      type="number"
      autocomplete="off"
      aria-hidden="true"
      :placeholder="placeholder"
      :required="required"
      v-model.number="selectedValue"
      :class="{ 'input-error': error }"
      :maxlength="maxlength"
      :disabled="disabled"
      @keydown="preventNonNumericInput"
      @paste="handlePaste"
      @keyup.enter="$emit('submit', selectedValue)"
    />

    <!-- Phone Input -->
    <VueTelInput
      v-else-if="type === 'phone'"
      v-model="selectedValue"
      autocomplete="off"
      aria-hidden="true"
      :class="{ 'input-error': error }"
      :style="{ direction: 'ltr', textAlign: 'left' }"
      @input="$emit('update', selectedValue)"
      @validate="$emit('validate', $event)"
      defaultCountry="sa"
      :dropdownOptions="{
        showDialCodeInList: true,
        showDialCodeInSelection: true,
        showFlags: true,
        showSearchBox: true,
        searchBoxPlaceholder: 'Search'
      }"
      :inputOptions="{
        placeholder: placeholder,
        required: required,
        disabled: disabled
      }"
    >
      <template v-slot:arrow-icon>
        <img src="@/assets/svg-icons/chevron-down.svg?url" alt="dropdown-arrow" />
      </template>
    </VueTelInput>
    <DatePickerInput
      v-else-if="type === 'date'"
      v-model="selectedValue"
      autocomplete="off"
      aria-hidden="true"
      :class="{ 'input-error': error }"
      :placeholder="placeholder"
      v-bind="datePickerProps"
      @cleared="$emit('cleared', $event)"
      @open="$emit('open', $event)"
      @closed="$emit('closed', $event)"
    />
    <!-- Password Input -->
    <div class="password-input" v-else-if="type === 'password'">
      <input
        :type="toggle ? 'text' : 'password'"
        :placeholder="placeholder"
        autocomplete="new-password"
        aria-hidden="true"
        spellcheck="false"
        :required="required"
        v-model="selectedValue"
        :class="{ 'input-error': error }"
        :maxlength="maxlength"
        :disabled="disabled"
        @keyup.enter="$emit('submit', selectedValue)"
      />
      <div class="show-password" @click="toggle = !toggle">
        <img src="@/assets/svg-icons/eye-close-icon.svg?url" alt="show-password" v-if="!toggle" />
        <img src="@/assets/svg-icons/eye-open-icon.svg?url" alt="hide-password" v-else />
      </div>
    </div>
    <div class="input-group" v-else-if="type === 'file'">
      <UploadFile :type="['.pdf']" @file="$emit('upload', $event)" showFileInfo />
    </div>

    <!-- Default Input -->
    <input
      v-else
      :type="type"
      autocomplete="off"
      aria-hidden="true"
      :placeholder="placeholder"
      :required="required"
      v-model="selectedValue"
      :class="{ 'input-error': error }"
      :maxlength="maxlength"
      :disabled="disabled"
      @keyup.enter="$emit('submit', selectedValue)"
    />

    <!-- Validation Errors -->
    <span class="validation_errors" v-if="error">
      {{ error }}
    </span>
    <span class="limit" v-if="maxlength">
      {{ $t('validations.charecterLimit') }} {{ String(selectedValue).length || 0 }} /
      {{ maxlength }}
    </span>
  </div>
</template>

<style scoped>
.custom-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  gap: 8px;
}

.custom-checkbox input[type='checkbox'] {
  opacity: 0;
  position: absolute;
  left: 0;
  height: 0;
  width: 0;
  cursor: pointer;
}

.input-textarea {
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--Base-White, #fff);

  /* Shadows/shadow-xs */
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.custom-checkbox .checkmark {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid var(--Gray-300, #d0d5dd);
  background: var(--Gray-50, #f9fafb);
  position: relative;
  transition: background-color 0.3s ease;
  display: inline-block;
  flex-shrink: 0;
}

.custom-checkbox:hover .checkmark {
  background-color: #e6e6e6;
}

.custom-checkbox input[type='checkbox']:checked ~ .checkmark {
  background-color: var(--Secondary---500, #15b377);
  border-color: var(--Secondary---500, #15b377);
}

.custom-checkbox .checkmark::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M11.6663%203.5L5.24967%209.91667L2.33301%207%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center;
  transition: opacity 0.1s;
  opacity: 0;
  pointer-events: none;
}

.custom-checkbox input[type='checkbox']:checked ~ .checkmark::before {
  opacity: 1;
}

.custom-checkbox .checkmark::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--Secondary---500, #15b377);
  border-radius: 50%;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
}

.custom-checkbox input[type='checkbox']:checked ~ .checkmark::after {
  animation: ripple 0.5s linear;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.custom-checkbox input[type='checkbox']:focus ~ .checkmark {
  box-shadow: 0 0 0 2px rgba(21, 179, 119, 0.5);
}

.custom-checkbox input[type='checkbox']:disabled ~ .checkmark {
  background-color: var(--Gray-100, #f2f2f2);
  border-color: var(--Gray-300, #d0d5dd);
  cursor: not-allowed;
}

.custom-checkbox input[type='checkbox']:disabled ~ span {
  color: var(--Gray-500, #a0a0a0);
  cursor: not-allowed;
}

.custom-checkbox input[type='checkbox']:disabled ~ .checkmark {
  pointer-events: none;
}

.custom-checkbox span:last-child {
  font-size: 14px;
  color: var(--Dark-800, #454545);
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  color: var(--Dark-800, #454545);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
html[dir='rtl'] label {
  font-weight: 400;
}

input {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  padding: 10px 14px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  outline: none;
}

input::placeholder {
  color: var(--Dark-300, #b0b0b0);
  text-overflow: ellipsis;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.validation_errors input {
  border-color: var(--error);
}

.limit {
  font-size: 14px;
  color: #475467;
  font-weight: 400;
  line-height: 20px;
}

.input-error {
  border-color: red;
}

.search-input {
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 8px 12px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
}

.validation_errors {
  color: var(--Error-500, var(--error, #f04438));
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.input-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.search-input input {
  border: none;
  flex: 1;
  background: transparent;
  box-shadow: none;
}

.search-input input:focus {
  outline: none;
}

[dir='rtl'] .search-input input {
  text-align: right;
  /* For RTL languages */
}

[dir='rtl'] .input-icon {
  margin-right: 0;
  margin-left: 8px;
}

.search-input input:focus::placeholder {
  opacity: 0;
  /* Hides the placeholder when the input is focused */
}

.vue-tel-input,
input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  padding: 14px 18px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  outline: none;
}

.vue-tel-input {
  padding: 7px 18px;
}

.expiry-date-input,
.cvc-code-input {
  position: relative;
}

.expiry-date-input input,
.cvc-code-input input {
  padding-left: 40px;
}

.expiry-date-input img,
.cvc-code-input img {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.password-input {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.password-input input {
  padding-right: calc(1rem + 20px + 8px);
}

.show-password {
  display: flex;
  position: absolute;
  right: 1rem;
  cursor: pointer;
}

.show-password img {
  width: 20px;
  height: 20px;
}
</style>

<style>
.vti__flag {
  display: none;
}

.vti__country-code {
  padding: 0 4px;
}

.vue-tel-input.input-error {
  border-color: red;
}
html[lang='ar'] .dp__main .dp__icon {
  transform: rotate(180deg);
}

.dp__action_row {
  width: 100%;
}

.dp__action_buttons {
  min-width: 100%;
  display: flex;
  justify-content: space-between;
}
.dp__action_buttons .dp__action_select {
  width: 100%;
  min-height: 20px;
  display: flex;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  border: 1px solid var(--Secondary---500, #15b377);
  background: var(--Secondary---500, #15b377);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.dp__pm_am_button {
  background: var(--Secondary---500, #15b377);
}
</style>
