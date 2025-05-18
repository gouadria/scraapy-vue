<template>
  <Transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <Transition name="modal-content-animation">
        <div v-show="modalActive" class="modal-content">
          <CloseIcon @click="close" v-show="closeActive" class="closeicon" />
          <!-- Modal content -->
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts">
import CloseIcon from '@/assets/svg-icons/CloseIcon.vue'
export default {
  components: { CloseIcon },
  props: ['modalActive', 'closeActive'],
  setup(props, { emit }) {
    const close = () => {
      emit('close')
    }
    return {
      close
    }
  }
}
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-content-animation-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-content-animation-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-content-animation-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-content-animation-leave-to {
  transform: scale(0.8);
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: red;
  /* max-width: 640px; */
  width: 70%;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  /* padding: 64px 16px; */
  border-radius: 4px;
  background: #f9fafb;
  box-shadow:
    0px 20px 24px -4px rgba(16, 24, 40, 0.08),
    0px 8px 8px -4px rgba(16, 24, 40, 0.03);
}
.closeicon {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}
html[dir='ltr'] .closeicon {
  right: 15px;
  left: unset;
}
.closeicon:hover {
  transition: all 0.5s ease-in-out;
}

.button-close-modal {
  padding: 20px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #5757bc;
  color: #fff;
  font-size: 16px;
  border-radius: 8px;
}
@media (max-width: 768px) {
  .modal-content {
    max-width: 100%;
    width: 100%;
    height: 100%;
  }
}
</style>
