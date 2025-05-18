import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useIsTablet(): { isTablet: Ref<boolean> } {
  const isTablet = ref<boolean>(false)

  const updateIsTablet = (): void => {
    isTablet.value = window.innerWidth <= 1300 && window.innerWidth >= 768
  }

  onMounted(() => {
    updateIsTablet()
    window.addEventListener('resize', updateIsTablet)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsTablet)
  })

  return { isTablet }
}
