<script lang="ts">
import type { PropType , Component} from 'vue';
export default {
  name: 'StepTitle',
  props: {
    title: String,
    subTitle: String,
    icon: String
  },
}
</script>
<template>
  <div class="step_title_container">
    <div class="step_title_icon">
        <component :is="icon"></component>
    </div>
    <div class="step_title_heading">
      <h1>{{ title }}</h1>
      <p>{{ subTitle }}</p>
    </div>
  </div>
</template>

<style scoped>
.step_title_container {
  display: flex;
  gap: 12px;
  justify-items: flex-start;
}

.step_title_heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step_title_heading h1 {
  color: var(--Dark-900, #3d3d3d);
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
}

.step_title_heading p {
  color: var(--Dark-600, #5d5d5d);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
</style>
