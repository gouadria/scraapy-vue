<script lang="ts">
import { defineComponent } from 'vue'
import DropDown from '@/components/UIElements/DropDown.vue'

export default defineComponent({
  name: 'langDropdown',
  components: {
    DropDown
  },
  data() {
    return {
      options: [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'العربية' }
      ],
    }
  },
  computed: {
    selectedValue: {
      get() {
        return this.$i18n.locale
      },
      set(val) {
        this.$i18n.locale = val
      }
    }
  },
})
</script>

<template>
  <DropDown :options="options" v-model="selectedValue">
    <template v-slot:trigger>
      <img src="@/assets/lang.svg?url" alt="Language" />
    </template>
  </DropDown>
</template>
