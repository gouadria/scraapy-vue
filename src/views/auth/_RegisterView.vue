<script lang="ts">
import { defineComponent } from 'vue'
import AuthView from '@/views/AuthView.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import userTypeToggle from '@/components/UIElements/userTypeToggle.vue'
import progressBar from '@/components/UIElements/progressBar.vue'
import Terms from '@/views/auth/Terms.vue'

export default defineComponent({
  name: 'RegisterView',
  components: {
    AuthView,
    inputField,
    MainBtn,
    userTypeToggle,
    progressBar,
    Terms
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      showTerms: false,
      showVerify: false,
      step: 0,
      stepTitles: [
        this.$t('auth.basicInfo'),
        this.$t('auth.emailVerification'),
        this.$t('auth.complete')
      ],
      stepTitlesBusiness: [
        this.$t('auth.basicInfo'),
        this.$t('auth.emailVerification'),
        this.$t('auth.businessInfo'),
        this.$t('auth.complete')
      ],
      selectedType: 0,
      registerTypes: [this.$t('auth.Individual'), this.$t('auth.Business')],
      name: '',
      email: '',
      contact_number: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
      serverError: ''
    }
  },

  validations() {
    return {
      name: {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
        minLength: helpers.withMessage(
          () => this.$t('validations.minLength', { min: 3 }),
          minLength(3)
        )
      },
      email: {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
        email: helpers.withMessage(() => this.$t('validations.email'), email)
      },
      contact_number: {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
        // email: helpers.withMessage(() => this.$t('validations.email'), email)
      },
      phone: {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
        // phone: helpers.withMessage(() => this.$t('validations.phone'), phone)
      },
      password: {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
        minLength: helpers.withMessage(
          () => this.$t('validations.minLength', { min: 8 }),
          minLength(8)
        )
      },
      confirmPassword: {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
        sameAsPassword: helpers.withMessage(
          () => this.$t('validations.sameAsPassword'),
          sameAs(this.password)
        )
      },
      terms: {
        sameAs: helpers.withMessage(() => this.$t('validations.terms'), sameAs(true))
      }
    }
  },
  computed: {
    isPasswordLength() {
      return this.password.length >= 8
    },
    isPasswordSpecial() {
      return /[!@#$%^&*(),.?":{}|<>]/.test(this.password)
    }
  },
  methods: {
    handleUpdate(field, value) {
      this.v$[field].$touch()
      this[field] = value
    },
    async validateEmail() {
      try {
        await this.$userStore.dispatch('registerUser', {
          user_type: this.selectedType ? 'business' : 'individual',
          name: this.name,
          contact_number: this.contact_number,
          email: this.email,
          password: '' // Empty password
        })
        // Registration should not succeed with empty password
        this.serverError = 'Unexpected success during email validation.'
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errors = error.response.data.errors || error.response.data

          if (errors.email) {
            // Email already exists
            this.serverError = 'Email already exists'
            // Optionally, keep the user on the same step
          } else if (errors.contact_number) {
            // Email already exists
            this.serverError = 'Contact Number already exists'
            // Optionally, keep the user on the same step
          } else if (errors.password) {
            // Password validation error, which is expected
            // Proceed to next step
            this.serverError = ''
            this.step++
          } else {
            // Other validation errors
            this.serverError = 'Validation error: ' + JSON.stringify(errors)
          }
        } else {
          console.error('Failed to validate data', error)
          this.serverError = 'An error occurred while validating the email.'
        }
      }
    },
    async postRegister() {
      await this.$userStore
        .dispatch('registerUser', {
          user_type: this.selectedType ? 'business' : 'individual',
          name: this.name,
          email: this.email,
          contact_number: this.contact_number,
          password: this.password
        })
        .then(() => {
          this.step++
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            const errors = error.response.data.errors || error.response.data
            if (errors.email) {
              this.serverError = 'Email already exists'
              this.step = 0
            } else {
              this.serverError = 'Registration error: ' + JSON.stringify(errors)
            }
          } else {
            console.error('Failed to register', error)
          }
        })
    },
    async nextStep() {
      if (this.step === 0) {
        this.v$.name.$touch()
        this.v$.email.$touch()
        this.v$.contact_number.$touch()
        this.v$.terms.$touch()

        if (!this.v$.name.$invalid && !this.v$.email.$invalid && !this.v$.terms.$invalid) {
          await this.validateEmail()
        }
      } else if (this.step === 1) {
        this.v$.password.$touch()
        this.v$.confirmPassword.$touch()
        if (!this.v$.password.$invalid && !this.v$.confirmPassword.$invalid) {
          this.postRegister()
        }
      }
    }
  }
})
</script>
<template>
  <Terms :show="showTerms" @close="showTerms = false" @acceptTerms="() => {
    showTerms = false
    terms = true
  }
    " />

  <!-- OTP Modal (shown after accepting terms) -->
  <OTPModal
    v-if="showVerify"
    :show="showVerify" 
    :digits="6"
    @close="showVerify = false"
  />
  <AuthView>
    <template v-slot:title>{{ $t('auth.signupTitle') }}</template>
    <template v-slot:subtitle>{{ $t('auth.signupTitle') }}</template>
    <template v-slot:content>
      <transition name="slide-fade">
        <div class="radio-group" v-if="step === 0">
          <label v-for="(type, index) in registerTypes" :key="index">
            <input
              type="radio"
              :value="index"
              v-model="selectedType"
              @change="validateSelection"
            />
            {{ type }}
          </label> 
          <p v-if="showError" class="error-message">Please select a user type</p>
        </div>

        <!-- Progress (when selected) -->
        <div class="signupStep" v-else>
          <progressBar :currentStep="step - 1" :steps="selectedType === 0 ? stepTitles : stepTitlesBusiness" />
        </div>
      </transition>

      <transition name="slide-fade">
        <div class="signupStep" v-if="step == 0">
          <inputField :label="selectedType === 0 ? $t('auth.fullName') : $t('auth.fullBusinessName')"
            :error="v$.name.$errors[0]?.$message" :value="name" @update="handleUpdate('name', $event)" type="text"
            :placeholder="selectedType === 0 ? $t('auth.fullName') : $t('auth.businessName')" required />
          <div class="grid-container">
            <div class="main-content">
              <inputField :label="$t('auth.phone')" :error="v$.contact_number.$errors[0]?.$message" :value="contact_number"
                @update="handleUpdate('contact_number', $event)" type="text" :placeholder="$t('auth.phone')" required />
            </div>
            <div class="second-content"><a @click="showVerify = true">{{ $t('auth.verify') }}</a></div>
          </div>
          <inputField :label="$t('auth.email')" :error="v$.email.$errors[0]?.$message || serverError" :value="email"
            @update="handleUpdate('email', $event)" type="email" :placeholder="$t('auth.email')" required />
          <div class="terms">
            <div class="terms-error" v-if="v$.terms.$errors[0]?.$message">
              <span class="error">{{ $t('validations.terms') }}</span>
            </div>
            <div class="terms-link-wrapper">
              <div class="checkbox-input-wrapper">
                <inputField type="checkbox" :value="terms" @update="handleUpdate('terms', $event)" />
              </div>
              <div class="terms-link">
                <p>{{ $t('auth.accept') }}</p>
                &nbsp;
                <a @click="showTerms = true">{{ $t('auth.terms') }}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="signupStep" v-else-if="step == 1">
          <inputField :label="$t('auth.password')" :error="v$.password.$errors[0]?.$message" :value="password"
            @update="handleUpdate('password', $event)" type="password" :placeholder="$t('auth.EnterPassword')"
            required />
          <inputField :label="$t('auth.confirmPassword')" :error="v$.confirmPassword.$errors[0]?.$message"
            :value="confirmPassword" @update="handleUpdate('confirmPassword', $event)" type="password"
            :placeholder="$t('auth.ReenterPassword')" required />
          <div class="password-conditions">
            <div :class="['condition', { valid: isPasswordLength }]">
              <img src="@/assets/svg-icons/check-grey.svg?url" alt="check" />
              <span>
                {{ $t('auth.passwordCondition8Chars') }}
              </span>
            </div>
            <div :class="['condition', { valid: isPasswordSpecial }]">
              <img src="@/assets/svg-icons/check-grey.svg?url" alt="check" />
              <span>
                {{ $t('auth.passwordConditionSpecial') }}
              </span>
            </div>
          </div>
        </div>
        <div class="signupStep check-email" v-else-if="step == 2">
          <h1>
            {{ $t('auth.Checkyouremail') }}
          </h1>
          <span>
            {{ $t('auth.linkSentToEmail') }}
          </span>
        </div>
      </transition>

      <div class="button-group" v-if="step < 2">
        <MainBtn type="green" @click="nextStep">{{ $t('auth.Next') }}</MainBtn>
      </div>
      <div class="auth-prompt" v-if="step == 0">
        <p>{{ $t('auth.alreadyHaveAccount') }}</p>
        <div class="link" @click="$router.push({ name: 'login' })">
          {{ $t('auth.login') }}
        </div>
      </div>
    </template>
  </AuthView>
</template>

<style scoped>
.green-btn {
  width: 100%;
}

.signupStep {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 14px;
}

.check-email {
  justify-content: center;
  align-items: center;
}

.check-email h1 {
  color: var(--Dark-950, #121212);
  font-size: 30px;
  font-weight: 600;
  line-height: 38px;
}

.check-email span {
  color: var(--Dark-700, #4f4f4f);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.password-conditions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.condition {
  display: flex;
  gap: 8px;
  align-items: center;
}

.condition.valid img {
  filter: invert(20%) sepia(100%) saturate(3673%) hue-rotate(101deg) brightness(97%) contrast(104%);
}

.error {
  color: var(--Error-500, var(--error, #f04438));
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.auth-prompt {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.terms {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.terms-link-wrapper {
  display: flex;
  gap: 12px;
}

.checkbox-input-wrapper {
  display: flex;
  align-items: center;
}

.terms-link {
  display: flex;
  align-items: center;
}

.terms-link a {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-decoration-line: underline;
  cursor: pointer;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
.radio-group {
  display: flex;
  gap: 10px; /* Spacing between buttons */
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px; /* Spacing between radio and text */
  cursor: pointer;
}

.radio-group input[type="radio"] {
  margin: 0; /* Remove default margin */
}
.grid-container {
  display: grid;
  grid-template-columns: 80% 20%; /* Explicit 80/20 split */
}

.second-content {
  padding: 20px 30px;
}

.second-content a {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
