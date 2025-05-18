<template>
  <AuthView>
    <template v-slot:title>{{ $t('auth.vendorSignup') }}</template>
    <template v-slot:subtitle>{{ $t('auth.vendorSignupSubtitle') }}</template>
    <template v-slot:content>
      <div class="signupStep">
        <progressBar :currentStep="step" :steps="stepTitles" />
      </div>

      <transition name="slide-fade">
        <div class="signupStep" v-if="step === 2">
          <inputField
            :label="$t('auth.CRNumber')"
            :error="v$.crNumber?.$errors[0]?.$message || serverError"
            :value="crNumber"
            @update="updateCrNumber"
            type="text"
            :placeholder="$t('auth.CRNumberpleacholder')"
            required
          />
          <div class="cr-number-conditions">
            <div :class="['condition', { valid: isCrNumberValid }]">
              <img src="@/assets/svg-icons/check-grey.svg?url" alt="check" />
              <span>
                {{ $t('auth.DigitCR') }}
              </span>
            </div>
          </div>
          <!-- <h6 class="error">{{ serverError }}</h6> -->
        </div>

        <div class="signupStep Welcome" v-else-if="step === 3">
          <h1>
            {{ $t('auth.welcome') }} <span>{{ $t('auth.scrapy') }}</span>
          </h1>
          <p>{{ $t('auth.welcomeMsg') }}</p>
        </div>
      </transition>
      <!-- <div class="button-group"> -->
      <MainBtn type="green" @click="nextStep">
        {{ step === 2 ? $t('auth.verify') : $t('auth.proceedToDashboard') }}
      </MainBtn>
      <!-- </div> -->
    </template>
  </AuthView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthView from '@/views/AuthView.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, numeric } from '@vuelidate/validators'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import progressBar from '@/components/UIElements/progressBar.vue'

export default defineComponent({
  name: 'RegisterBusinessView',
  components: {
    AuthView,
    inputField,
    MainBtn,
    progressBar
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      step: 2,
      stepTitles: [
        this.$t('auth.basicInfo'),
        this.$t('auth.emailVerification'),
        this.$t('auth.businessInfo'),
        this.$t('auth.complete')
      ],
      crNumber: '',
      serverError: ''
    }
  },
  validations() {
    return {
      crNumber: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10)
      }
    }
  },
  computed: {
    isCrNumberValid() {
      return this.crNumber.length === 10
    }
  },
  methods: {
    updateCrNumber(value: string) {
      this.crNumber = value
      this.v$.crNumber.$touch()
    },
    async postCrNumber() {
      await this.$userStore
        .dispatch('registerBusinessProfile', {
          cr_number: this.crNumber
        })
        .then(() => {
          this.step++
        })
        .catch((error) => {
          if (error === 'cr_number') {
            this.serverError = this.$t('errorsMsgs.cr_number_exist')
          }
        })
    },
    nextStep() {
      if (this.step === 2) {
        this.v$.crNumber.$touch()
        if (!this.v$.crNumber.$invalid) {
          this.postCrNumber()
        }
      } else {
        this.$router.push({ name: 'management' })
      }
    }
  }
})
</script>

<style scoped>
.condition {
  display: flex;
  gap: 8px;
  align-items: center;
}
.condition.valid img {
  filter: invert(20%) sepia(100%) saturate(3673%) hue-rotate(101deg) brightness(97%) contrast(104%);
}
.signupStep {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.signupStep .input-item {
  width: 100%;
}
.Welcome {
  align-items: center;
  text-align: center;
}
</style>
