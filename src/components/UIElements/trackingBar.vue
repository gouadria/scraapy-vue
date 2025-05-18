<template>
  <div class="progress-stepper">
    <div
      v-for="(step, index) in steps"
      :key="step.value"
      class="step-container"
      :class="[`container-${step.value}`]"
    >
      <div class="step-content">
        <div
          class="step-indicator"
          :class="{
            complete: isStepComplete(index),
            current: isCurrentStep(index),
            pending: isStepPending(index),
            [`step-${step.value}`]: true
          }"
        >
          <div class="indicator-inner">
            <svg
              v-if="isStepComplete(index)"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
            >
              <g clip-path="url(#clip0_6099_145746)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.9476 0.621934L4.5943 8.6836L2.37763 6.31527C1.9693 5.93027 1.32763 5.90693 0.860963 6.2336C0.405963 6.57193 0.277629 7.16693 0.55763 7.64527L3.18263 11.9153C3.4393 12.3119 3.88263 12.5569 4.3843 12.5569C4.86263 12.5569 5.31763 12.3119 5.5743 11.9153C5.9943 11.3669 14.0093 1.81193 14.0093 1.81193C15.0593 0.7386 13.7876 -0.206399 12.9476 0.610268V0.621934Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_6099_145746">
                  <rect width="15" height="13" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <span
          class="step-label"
          :class="{
            complete: isStepComplete(index),
            current: isCurrentStep(index),
            [`label-${step.value}`]: true
          }"
        >
          {{ step.label }}
        </span>
      </div>
      <div
        v-if="index < steps.length - 1"
        class="step-line"
        :class="{ complete: isStepComplete(index), [`line-${step.value}`]: true }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Step {
  label: string
  value: string
  role?: string
}

export default defineComponent({
  name: 'trackingBar',
  props: {
    steps: {
      type: Array as PropType<Step[]>,
      required: true,
      default: () => []
    },
    currentStep: {
      type: Number,
      required: true,
      default: 0
    },
    userRole: {
      type: String as PropType<'seller' | 'buyer' | ''>,
      default: ''
    }
  },
  computed: {
    isStepComplete(): (index: number) => boolean {
      return (index: number) => index < this.currentStep
    },
    isCurrentStep(): (index: number) => boolean {
      return (index: number) => index === this.currentStep
    },
    isStepPending(): (index: number) => boolean {
      return (index: number) => index > this.currentStep
    }
  }
})
</script>

<style scoped>
.progress-stepper {
  display: flex;
  flex-direction: column;
  /* gap: 8px; */
}

.step-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.step-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-indicator {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e5e7eb;
  padding: 6px;
  transition: all 0.3s ease;
}

.indicator-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
}

.step-indicator.complete {
  border-color: #10b981;
  padding: 0;
  border: none;
}

.step-indicator.complete .indicator-inner {
  background-color: #10b981;
}

.step-label {
  font-size: 16px;
  color: #6b7280;
  font-weight: 500;
  transition: color 0.3s ease;
}

.step-label.complete {
  color: #10b981;
}

.step-line {
  width: 2px;
  height: 24px;
  background-color: #e5e7eb;
  margin-left: 14px;
  margin-top: 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

[dir='rtl'] .step-line {
  margin-right: 14px;
  margin-left: 0;
}

.step-line.complete {
  background-color: #10b981;
  margin-top: 0;
}

.step-reviewing.current {
  background: #f79009;
  border: none;
  outline: 3px solid rgba(247, 144, 9, 0.24);
  animation: flash 1.5s infinite;
}

.step-reviewing.current .indicator-inner {
  background-color: #fff;
}

.step-preparing.current,
.step-ready.current {
  background: #136a83;
  border: none;
  outline: 3px solid rgba(19, 106, 131, 0.24);
  animation: flash 1.5s infinite;
}

.step-preparing.current .indicator-inner,
.step-ready.current .indicator-inner {
  background-color: #fff;
}

.step-shipped.current {
  background: #15b377;
  border: none;
  outline: 3px solid #d2f9e3;
  animation: flash 1.5s infinite;
}

.step-shipped.current .indicator-inner {
  background-color: #fff;
}

.step-received.current {
  background: #15b377;
  border: none;
  outline: 3px solid #d2f9e3;
  animation: flash 1.5s infinite;
}

.step-received.current .indicator-inner {
  background-color: #fff;
}

.step-complete.current {
  background: #10b981;
  border: none;
  outline: 3px solid rgba(16, 185, 129, 0.24);
  animation: flash 1.5s infinite;
}

.step-complete.current .indicator-inner {
  background-color: #fff;
}

.label-reviewing.current {
  color: #f79009;
}
.label-preparing.current,
.label-ready.current {
  color: #136a83;
}
.label-shipped.current {
  color: #3b82f6;
}
.label-received.current {
  /* color: #15B377; */
}
.label-complete.current {
  color: #10b981;
}

@keyframes flash {
  0%,
  100% {
    outline-color: transparent;
  }
  50% {
    outline-color: inherit;
  }
}
</style>
