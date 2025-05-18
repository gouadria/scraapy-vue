<template>
  <ModalComponent
    :modal-active="showModal"
    :closeActive="false"
    @close="openWarningsModal"
    class="warnings_modal"
  >
    <div class="warnings_modal_content">
      <div class="icon_box">
        <img src="@/assets/svg-icons/listings/warning-icon.svg?url" alt="warning-icon" />
      </div>
      <div class="content_warning">
        <div class="title">{{ $t('listings.warningTitle') }}</div>
        <div class="subtitle">{{ $t('listings.warningMessage') }}</div>
      </div>
      <div class="missing_info">
        <ul class="missing_list">
          <li v-for="(item, index) in missingInformation" :key="index">
            {{ item.name }}
          </li>
        </ul>
      </div>

      <div class="action">
        <MainBtn type="green" @click="GoToLegalInformation">
          <div class="btn-content">{{ $t('listings.legalInformation') }}</div>
        </MainBtn>
      </div>
    </div>
  </ModalComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import ModalComponent from '../ModalComponent.vue'
import MainBtn from '../MainBtn.vue'
export default defineComponent({
  name: 'MissingRequirements',
  components: { ModalComponent, MainBtn },
  props: {
    missingInformation: {
      type: Array,
      required: true
    },
    openWarningsModal: {
      type: Function,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      router: useRouter()
    }
  },
  methods: {
    GoToLegalInformation() {
      // Map missingInformation to extract names
      const missingRequirements = this.missingInformation.map((missing) => missing.name)
      console.log('Missing Requirements:', missingRequirements)

      // Navigate using $router
      this.router.push({
        name: 'management',
        params: {
          page: 'Account',
          subPage: 'legalInformation'
        },
        query: {
          missing: JSON.stringify(missingRequirements)
        }
      })
    }
  }
})
</script>

<style scoped>
.warnings_modal_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 30px;
}

.warnings_modal_content .content_warning {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.missing_info {
  display: flex;
  justify-content: center;
  width: 100%;
  border: 1px solid#2222;
  padding: 4px;
  border-radius: 10px;
}

.missing_list {
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: inside;
  padding: 10px;
  gap: 12px;
}

.missing_list li {
  color: #454545;
  font-size: 16px;
}
</style>
<style>
.warnings_modal .modal-content {
  width: unset;
  max-width: unset;
}

@media (max-width: 776px) {
  .warnings_modal .modal-content {
    min-width: 50%;
    max-width: 90%;
    height: fit-content;
    text-align: center;
  }
}
</style>
