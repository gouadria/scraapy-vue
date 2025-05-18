<template>
  <DropMenu @update="show = $event" :show="show" :disabled="disabled">
    <template v-slot:trigger>
      <slot name="trigger">
        <div class="trigger-btn">
          <span class="dropdown-label">
            {{ selectedLabel }}
          </span>
          <div
            class="dropdown-arrow"
            :style="{ transform: show ? 'rotate(180deg)' : 'rotate(0deg)' }"
          >
            <component class="chevron-down" :is="chevronDown" />
          </div>

        </div>
      </slot>
    </template>

    <template v-slot:menu>
      <div class="dropdown-menu">
        <div
          class="dropdown-item"
          v-for="option in options"
          :key="option.value"
          @click.stop="selectOption(option)"
        >
          <span>{{ option.label }}</span>
        </div>
      </div>
    </template>
  </DropMenu>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import DropMenu from '@/components/UIElements/DropMenu.vue'
import chevronDown from '@/assets/svg-icons/chevron-down.svg'
export default defineComponent({
  name: 'DropDown',
  components: {
    DropMenu
  },
  props: {
    options: {
      type: Array as () => Array<{ value: string | number; label: string }>,
      required: true
    },
    modelValue: {
      type: [String, Number] as () => string | number | null,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    ephemeral: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      chevronDown: shallowRef(chevronDown),
      selectedValue:
        this.modelValue !== null && this.modelValue !== undefined
          ? this.modelValue
          : this.options[0]?.value || null
    }
  },
  computed: {
    selectedLabel(): string {
      if (this.ephemeral) {
        return this.placeholder
      }
      const selectedOption = this.options.find((option) => option.value === this.selectedValue)
      return selectedOption ? selectedOption.label : this.placeholder
    }
  },
  watch: {
    modelValue(newVal) {
      this.selectedValue =
        newVal !== null && newVal !== undefined ? newVal : this.options[0]?.value || null
    },
    options(newOptions) {
      if (this.ephemeral) {
        return
      }
      const selectedOptionExists = newOptions.some((option) => option.value === this.selectedValue)
      if (!selectedOptionExists) {
        this.selectedValue = newOptions[0]?.value || null
        this.$emit('update:modelValue', this.selectedValue)
      }
    }
  },
  methods: {
    selectOption(option: { value: string | number; label: string }) {
      this.selectedValue = option.value
      this.$emit('update:modelValue', option.value)
      this.show = false
    }
  },
  mounted() {
    if (this.selectedValue === null || this.selectedValue === undefined) {
      if (this.options && this.options.length > 0) {
        this.selectedValue = this.options[0].value
        this.$emit('update:modelValue', this.selectedValue)
      }
    }
  }
})
</script>

<style scoped>
.dropdown {
  position: relative;
}

.trigger-btn {
  width: 100%;
  min-height: 36px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  padding: 10px 14px;
  white-space: nowrap;
  user-select: none;
}


.chevron-down {
  stroke: #3D3D3D;
  stroke-width: 1.5;
}

.trigger-btn span {
  font-size: clamp(0.625rem, 0.5417rem + 0.3704vw, 0.875rem);
}

.dropdown-arrow {
  transition: transform 0.3s ease;
}

.dropdown-menu {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  width: 100%;
  max-height: 300px;
  overflow: auto;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: background-color 0.3s ease;
  width: 100%;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

/* Transition effects */
.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
