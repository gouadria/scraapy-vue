<template>
  <div class="progress-bar">
    <div class="progress">
      <!-- Progress bar fill -->
      <div class="bar">
        <div
          ref="barFill"
          v-if="bar__fill"
          class="bar__fill"
          :style="{ width: barFillPercent }"
        ></div>
      </div>

      <!-- Step points -->
      <div
        v-for="(name, index) in steps"
        :key="index"
        :class="[
          'point',
          {
            'point--upcoming': index > currentStep,
            'point--current': index == currentStep,
            'point--complete': index < currentStep
          }
        ]"
      >
        <!-- Ring for the bullet -->
        <div class="ring">
          <div class="bullet">
            <!-- Checkmark icon for completed steps -->
            <template v-if="index < currentStep">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <rect x="0.5" y="0.5" width="24" height="24" rx="12" fill="#15B377" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.596 7.89162L10.436 14.8016L8.53602 12.7716C8.18602 12.4416 7.63602 12.4216 7.23602 12.7016C6.84602 12.9916 6.73602 13.5016 6.97602 13.9116L9.22602 17.5716C9.44602 17.9116 9.82601 18.1216 10.256 18.1216C10.666 18.1216 11.056 17.9116 11.276 17.5716C11.636 17.1016 18.506 8.91162 18.506 8.91162C19.406 7.99162 18.316 7.18162 17.596 7.88162V7.89162Z"
                  fill="white"
                />
              </svg>
            </template>
            <!-- Checkmark icon for upcoming steps -->
            <template v-else-if="index >= currentStep">
              <span class="upcoming_span"></span>
            </template>
          </div>
        </div>
        <label class="label">{{ name }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressBar',
  props: {
    currentStep: {
      type: Number,
      required: true
    },
    steps: {
      type: Array as () => string[],
      required: true,
      validator(value: any) {
        if (value.length === 0) {
          console.error('Steps array should not be empty')
          return false
        }
        for (const step of value) {
          if (typeof step !== 'string' || step === '') {
            console.error('Each step should have a valid name')
            return false
          }
        }
        return true
      }
    },
    bar__fill: {
      type: Boolean,
      default: false,
      requerd: false
    }
  },
  computed: {
    barFillPercent() {
      return `${(this.currentStep / (this.steps.length - 1)) * 100}%`
    }
  }
})
</script>

<style scoped>
.progress-bar {
  width: 100%;
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 1rem;
}

.progress {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.bar {
  position: absolute;
  top: 11px;
  left: 0;
  right: 0;
  background: #e7e7e7;
  height: 3px;
  border-radius: 10px;
  overflow: hidden;
  left: 18px;
  right: 18px;
}

.bar__fill {
  height: 100%;
  background: #15b377;
  transition: width 0.5s ease;
}

.point {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ring {
  position: relative;
  width: 24px;
  height: 24px;
}

.bullet {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    background 0.3s,
    box-shadow 0.3s;
  border: 1.5px solid #e7e7e7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.point--complete .bullet {
  background: #15b377;
  width: 24px;
  height: 24px;
  border: 1.5px solid #15b377;
}

.point--current .bullet {
  box-shadow: 0 0 0 8px rgba(21, 179, 119, 0.2);
  border: 1.5px solid #15b377;
  background: #15b377;
}

.point--upcoming .bullet {
  background: #fff;
}

.label {
  margin-top: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #121212;
  white-space: nowrap;
}
.upcoming_span {
  display: flex;
  background: #b0b0b0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.point--current .bullet .upcoming_span {
  background: #fff;
}
</style>
