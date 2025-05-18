<template>
  <div class="dropmenu">
    <!-- Trigger button -->
    <div class="dropmenu-trigger" @click="handleClick">
      <slot name="trigger"></slot>
    </div>

    <!-- Dropdown menu -->
    <transition name="slide-fade">
      <div :class="['dropmenu-content rew', { full: fullScreen }, $i18n.locale === 'ar' ? uniqueClass : 'left']"
        :style="offsetMenu" v-if="is_active">
        <slot name="menu"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropMenu',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    uniqueClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      is_active: this.show,
      offsetMenu: {}
    }
  },
  watch: {
    show(newVal) {
      if (newVal !== this.is_active) {
        this.is_active = newVal
      }
    },
    is_active(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.UpdateOffsetMenu()
          document.addEventListener('click', this.handleOutsideClick)
        }, 10)
      } else {
        this.offsetMenu = {}
        this.removeOutsideClickListener()
      }
      this.$emit('update', newVal)
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      this.is_active = !this.is_active
    },
    UpdateOffsetMenu() {
      if (!this.$el) return

      if (this.fullScreen) {
        // if menu is full screen, adjust position to fit inside ignoring navbar and rates
        const navbar = document.querySelector('.nav-container') as HTMLElement
        const rates = document.querySelector('.daliy-rates-container') as HTMLElement
        let totalOfset = 0
        if (navbar) totalOfset += navbar.offsetHeight
        if (rates) totalOfset += rates.offsetHeight
        this.offsetMenu['top'] = `calc(${totalOfset}px - 1px)`
        this.offsetMenu['height'] = `calc((100dvh - ${totalOfset}px) + 1px)`
        return
      } else {
        // if menu is out of screen, adjust position to bring it inside
        const menu = this.$el.querySelector('.dropmenu-content') as HTMLElement
        const menuRect = menu.getBoundingClientRect()

        const rightOverflow = window.innerWidth - menuRect.right
        if (rightOverflow < 0) this.offsetMenu['left'] = `calc(${rightOverflow}px - 1rem)`

        const leftOverflow = menuRect.left
        if (leftOverflow < 0) this.offsetMenu['left'] = `calc(${Math.abs(leftOverflow)}px + 1rem)`

        const bottomOverflow = menuRect.bottom - window.innerHeight
        if (bottomOverflow > 0) this.offsetMenu['top'] = `calc(100% - ${bottomOverflow}px)`

        const topOverflow = menuRect.top
        if (topOverflow < 0) this.offsetMenu['top'] = `calc(100% + ${Math.abs(topOverflow)}px)`
      }
    },
    handleOutsideClick(e: Event) {
      if (!this.$el.querySelector('.dropmenu-content').contains(e.target as Node)) {
        this.is_active = false
        this.removeOutsideClickListener()
      }
    },
    removeOutsideClickListener() {
      document.removeEventListener('click', this.handleOutsideClick)
    }
  },
  unmounted() {
    this.removeOutsideClickListener()
  }
})
</script>

<style scoped>
.dropmenu {
  position: relative;
}

.dropmenu-trigger {
  display: flex;
  cursor: pointer;
  position: relative;
}

.rew.categories_dropdown {
  right: 0;
  left: unset;
}

/* when lang is ar, set position to right instead */
/* [lang='ar'] .dropmenu-content { */
/*   right: 0; */
/*   left: unset; */
/* } */

.dropmenu-content {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  z-index: 10;
  transition:
    opacity 150ms ease-in-out,
    transform 150ms ease-in-out;
  min-width: 100%;
}

.dropmenu-content.full {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

.dropmenu.input-error {
  border: 1px solid red;
  border-radius: 8px;
}
</style>
