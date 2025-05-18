<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalPopup',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    headerIcon: {
      type: String,
      required: false
    }
  }
})
</script>

<template>
  <div class="modal-backdrop" v-if="show">
    <div class="modal">
      <div class="header">
        <slot name="title"></slot>
        <img v-if="headerIcon" :src="`${headerIcon}`" />
        <button class="close" @click="$emit('close')">
          <img src="@/assets/svg-icons/close.svg?url" />
        </button>
      </div>

      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal {
  display: flex;
  flex-direction: column;
  width: calc(100% - 2rem);
  max-width: 1062px;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  gap: 1rem;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.close {
  background: none;
  border: none;
  cursor: pointer;
}

.close img:hover {
  filter: invert(32%) sepia(70%) saturate(447%) hue-rotate(146deg) brightness(96%) contrast(105%);
}
</style>
