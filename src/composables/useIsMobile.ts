import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useIsMobile(): { isMobile: Ref<boolean> } {
  const isMobile = ref<boolean>(false)

  const updateIsMobile = (): void => {
    isMobile.value = window.innerWidth <= 768
  }

  onMounted(() => {
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile)
  })

  return { isMobile }
}
