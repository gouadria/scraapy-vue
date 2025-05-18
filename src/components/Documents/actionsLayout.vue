<template>
  <div :class="containerClass">
    <button @click="triggerPrint">
      <img src="@/assets/documents_svg/printer.svg?url" alt="DownloadIcon" />
      {{ $t('documentMS.print') }}
    </button>
    <button @click="downloadBillings">
      <img src="@/assets/documents_svg/download.svg?url" alt="DownloadIcon" />
      {{ $t('documentMS.Download') }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ActionsLayout',
  props: {
    containerClass: {
      type: String,
      default: '',
      reqwired: false
    }
  },
  methods: {
    triggerPrint() {
      this.$emit('triggerPrint')
    },
    downloadBillings() {
      this.$emit('downloadBillings')
    }
  }
}
</script>
<style scoped>
.Global_actions_mobile,
.Global_actions {
  display: flex;
  width: 100%;
  align-items: flex-start;
  border-top: 1px solid #eaecf0;
  border-bottom: 1px solid #eaecf0;
  background: #f9fafb;
}
.Global_actions_mobile button,
.Global_actions button {
  background: none;
  border: none;
  outline: none;
  border-right: 1px solid #eaecf0;
  display: flex;
  height: 40px;
  padding: 8px 10px;
  align-items: center;
  gap: 6px;
  color: #475467;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  /* width: 100%; */
}
.Global_actions_mobile button:last-child,
.Global_actions button:last-child {
  border-right: none;
}
.mobile_global_nav {
  padding: 12px;
}
.Global_actions_mobile {
  flex-direction: column;
}

@media (max-width: 1200px) {
  .Global_actions_mobile,
  .Global_actions {
    border-radius: 8px;
  }
}
</style>
<style>
.mobile_global_nav .dropdown_menu {
  min-width: 160px;
}
</style>
