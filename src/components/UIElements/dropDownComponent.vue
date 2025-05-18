<template>
  <div class="dropdown_container" ref="dropdown">
    <button class="dropdown-toggle" @click="toggleDropdown">
      <slot name="button-content">{{ selectedLabel }}</slot>
      <img
        src="@/assets/documents_svg/chevron-down.svg?url"
        alt="ArrowIcon"
        v-if="isArowIcon"
        class="arrow"
        :class="{ rotateIcon: isOpen }"
      />
    </button>
    <div v-if="isOpen" class="dropdown_menu" :class="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
      <slot name="dropdown-items">
        <ul class="dropdown_item_ul">
          <li
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="dropdown_item"
          >
            {{ option.label }}
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue'

interface Option {
  label: string
  value: string | number
}

export default defineComponent({
  name: 'DropdownComponent',
  props: {
    options: {
      type: Array as () => Option[],
      required: false,
      default: () => [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ]
    },
    isArowIcon: {
      type: Boolean,
      default: false,
      required: false
    },
    modelValue: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['update:modelValue', 'optionSelected'],
  setup(props, { emit }) {
    const isOpen = ref(false)
    const selectedLabel = ref<string | null>(null)
    const dropdown = ref<HTMLElement | null>(null)

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const closeDropdown = () => {
      isOpen.value = false
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        const selected = props.options.find((option) => option.value === newValue)
        selectedLabel.value = selected ? selected.label : null
      },
      { immediate: true }
    )

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    const selectOption = (option: Option) => {
      emit('update:modelValue', option.value)
      selectedLabel.value = option.label
      closeDropdown()
      emit('optionSelected', option)
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isOpen,
      selectedLabel,
      toggleDropdown,
      selectOption,
      dropdown
    }
  }
})
</script>
<style scoped>
.dropdown_container {
  position: relative;
  display: inline-block;
}
html[dir='ltr'] .dropdown_container {
  display: block;
}
.dropdown-toggle {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.dropdown_menu {
  position: absolute;
  top: 100%;
  left: 0;
  border-radius: 4px;
  border: 1px solid #eaecf0;
  background: #fff;
  box-shadow:
    0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  min-width: 120px;
  width: 100%;
  z-index: 1000;
}
.rtl{
  left: 0;
  right: unset;
}
.ltr.dropdown_menu {
  right: 0;
  left: unset;
}
.dropdown_item {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
}
.dropdown-item:hover {
  background-color: #f0f0f0;
}
.rotateIcon {
  transition: all 0.3s ease-in-out;
  transform: rotate(180deg);
}
.dropdown_item_ul {
  padding: 0;
}
.dropdown_item_ul .dropdown_item:hover {
  background-color: #f0f0f0;
}
</style>
<style>
.arrow path {
  stroke: #475467;
}
</style>
