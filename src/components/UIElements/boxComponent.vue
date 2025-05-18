<template>
  <div class="common_box">
    <slot name="box_content"></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CommonBox'
}
</script>

<style scoped>
.common_box {
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid #e7e7e7;
}
</style>
