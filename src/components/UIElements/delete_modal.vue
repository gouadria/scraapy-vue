<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import DeleteIcon from '@/assets/svg-icons/deleteIcon.vue'
import CloseIcon from '@/assets/svg-icons/CloseIcon.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import ModalComponent from '@/components/UIElements/ModalComponent.vue'

export default defineComponent({
  components: {
    DeleteIcon,
    CloseIcon,
    MainBtn,
    ModalComponent
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: false,
      nullable: true
    },
    onClickCancel: {
      type: Function as PropType<() => void>,
      required: true
    },
    onClickButton: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<template>
  <ModalComponent :modal-active="isActive" class="global_delete_modal">
    <div class="delete_modal">
      <div class="icons">
        <div class="delete_icon">
          <DeleteIcon />
        </div>
        <div class="cancel_icon" @click="onClickCancel">
          <CloseIcon />
        </div>
      </div>
      <div class="title_message">
        <h2>{{ title }}</h2>
        <p>{{ subTitle }}</p>
      </div>
      <div class="buttons">
        <MainBtn @click="onClickButton" type="red">
          {{ buttonText || $t('listings.delete') }}
        </MainBtn>

        <MainBtn type="white" @click="onClickCancel">
          {{ $t('listings.Cancel') }}
        </MainBtn>
      </div>
    </div>
  </ModalComponent>
</template>

<style scoped>
.delete_modal {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  padding: 30px 20px;
  border-radius: 4px;
  background-color: white;
  gap: 24px;
}

.icons {
  display: flex;
  position: relative;
  justify-content: center;
}

.delete_icon {
  display: flex;
  border: 1px solid #fee4e2;
  border-radius: 8px;
  padding: 14px;
}

.cancel_icon {
  display: flex;
  position: absolute;
  right: 0px;
  cursor: pointer;
}

.arabic .cancel_icon {
  right: unset;
  left: 0px;
}

.icon svg {
  height: 28px;
  width: 28px;
}

.icon svg path {
  stroke: green;
}

.title_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.title_message p {
  font-size: 16px;
  font-weight: 400;
  color: #475467;
  width: 70%;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>

<style>
.global_delete_modal .modal-content {
  width: 360px;
  height: unset;
}
</style>
