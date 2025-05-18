<template>
  <div class="Global_actions" v-if="!isMobile.isMobile">
    <ActionsLayout
      containerClass="Global_actions"
      v-bind="$props"
      @triggerPrint="triggerPrint"
      @downloadBillings="downloadBillings"
    />
  </div>

  <div class="mobile_global_nav" v-else>
    <dropDownComponent>
      <template #button-content>
        <div class="dot_icon">
          <img src="@/assets/documents_svg/dots-vertical.svg?url" alt="DotsIcon" />
        </div>
      </template>
      <template #dropdown-items>
        <ActionsLayout
          containerClass="Global_actions_mobile"
          v-bind="$props"
          @triggerPrint="triggerPrint"
          @downloadBillings="downloadBillings"
        />
      </template>
    </dropDownComponent>
  </div>
</template>

<script lang="ts">
import { useIsMobile } from '@/composables/useIsMobile'
import dropDownComponent from '@/components/UIElements/dropDownComponent.vue'
import ActionsLayout from '@/components/Documents/actionsLayout.vue'

export default {
  components: {
    dropDownComponent,
    ActionsLayout
  },
  data() {
    return {
      isMobile: useIsMobile()
    }
  },

  methods: {
    triggerPrint() {
      this.$emit('triggerPrint')
    },
    downloadBillings() {
      this.$emit('downloadBillings')
    },
  }
}
</script>
