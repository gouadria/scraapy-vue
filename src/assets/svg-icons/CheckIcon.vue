<template>
  <div class="check_icon" @click="toggleVisibility">
    <svg
      v-if="status"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect width="20" height="20" rx="10" fill="#DCFAE6" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.2468 6.15838L8.28017 11.9167L6.69684 10.2251C6.40518 9.95005 5.94684 9.93338 5.61351 10.1667C5.28851 10.4084 5.19684 10.8334 5.39684 11.1751L7.27184 14.2251C7.45518 14.5084 7.77184 14.6834 8.13017 14.6834C8.47184 14.6834 8.79684 14.5084 8.98018 14.2251C9.28018 13.8334 15.0052 7.00838 15.0052 7.00838C15.7552 6.24172 14.8468 5.56672 14.2468 6.15005V6.15838Z"
        fill="#17B26A"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect width="20" height="20" rx="10" fill="#D0D5DD" />
      <path
        d="M6.25 10L8.75 12.5L13.75 7.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'EyePassIcon',
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const toggleVisibility = () => {
      emit('toggle', props.status)
    }

    return {
      toggleVisibility
    }
  }
})
</script>
