<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import AuthView from '@/views/AuthView.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import inputField from '@/components/UIElements/inputField.vue'
import OTP from '@/components/UIElements/OTP.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    AuthView,
    MainBtn,
    inputField,
    OTP
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  data() {
    return {
      step: 1,
      isPasswordLogin: true,
      rememberMe: false,
      email_or_phone: '',
      otp: '',
      otps: '',
      isOtpButton: false,
      password: '',
      otp_timeout_seconds: 0,
      loginError: false,
    }
  },
  computed: {
    loginMethodText() {
      return this.isPasswordLogin
        ? this.$t('auth.loginWithSSO')
        : this.$t('auth.loginWithPassword')
    },
    formatTime() {
      const minutes = Math.floor(this.otp_timeout_seconds / 60)
      const seconds = this.otp_timeout_seconds % 60
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }
  },
  validations() {
    return {
      email_or_phone: {
        required: helpers.withMessage(
          () => this.$t('validations.requiredField'),
          required
        )
      },
      otp: {
        minLength: helpers.withMessage(
          () => this.$t('validations.minLength', { min: 6 }),
          minLength(6)
        )
      },
      otps: {
        minLength: helpers.withMessage(
          () => this.$t('validations.minLength', { min: 6 }),
          minLength(6)
        )
      }
    }
  },
  methods: {
    googleLogin() {
      this.$userStore.dispatch('googleLoginRedirect')
    },
    handleLoginMethodChange() {
      this.isPasswordLogin = !this.isPasswordLogin
      this.step = 1
    },
    handleUpdate(field: string, value: string) {
      this.v$[field]?.$touch()
      this[field] = value
    },
    startCountdown() {
      const countdownTimeSec = 120
      this.otp_timeout_seconds = countdownTimeSec

      const interval = setInterval(() => {
        if (this.otp_timeout_seconds > 0) {
          this.otp_timeout_seconds--
        } else {
          clearInterval(interval)
        }
      }, 1000)
    },
    handleOtpUpdate(newOtp: string) {
      this.otp = newOtp.slice(0, 6)
    },
    handleSingleInput(event: Event) {
      const target = event.target as HTMLInputElement
      if (target.value.length > 1) {
        target.value = target.value.slice(-1)
      }
    },
    nextStep() {
      if (this.isPasswordLogin) {
        this.v$.email_or_phone.$touch()
        if (!this.v$.email_or_phone.$invalid) {
          this.postLogin()
        }
      } else {
        if (this.step === 1) {
          this.step = 2
          this.startCountdown()
        } else {
          this.$router.push({ name: 'home' })
        }
      }
    },
    verifyStep() {
      if (this.otps.length >= 6) {
        this.postVerify()
      } else {
        this.v$.otps.$touch()
      }
    },
    async postLogin() {
      try {
        await this.$userStore.dispatch('login2', {
          email_or_phone: this.email_or_phone,
        })
        this.isOtpButton = true
        this.step = 2
        this.startCountdown()
      } catch (error) {
        this.loginError = true
        console.error('Login error:', error)
      }
    },
    async postVerify() {
      try {
        await this.$userStore.dispatch('verify_otp', {
          phone: this.email_or_phone,
          otp: this.otps
        })
        this.$router.push({ name: 'marketplace' })
      } catch (error) {
        this.loginError = true
        console.error('OTP verification error:', error)
      }
    }
  }
})
</script>


<template>
  <AuthView>
    <template v-slot:title>{{ $t('auth.loginTitle') }}</template>
    <template v-slot:subtitle>{{ $t('auth.welcomeBack') }}</template>
    <template v-slot:content>
      <div v-if="step == 1" class="login-form">
        <div class="error" v-if="loginError">
          <div class="login-error">
            <p>{{ $t('auth.phoneError') }}</p>
          </div>
        </div>
        <inputField
          :label="$t('auth.email_or_phone')"
          :error="v$.email_or_phone?.$errors[0]?.$message"
          :value="email_or_phone"
          @submit="nextStep"
          @update="handleUpdate('email_or_phone', $event)"
          type="tel"
          placeholder="+9665xxxxxxxx or email@email.com"
          required
        />
      </div>

      <div v-if="step === 2" class="otp-form">
        <div class="otp_data">
          <div class="form-info">
            <h1>Check your email</h1>
            <p>Enter the OTP sent to {{ email_or_phone }}</p>
          </div>
          <div class="form-control">
            
            <inputField
              :value="otps"
              @update="handleUpdate('otps', $event)"
              required
            />
            <span class="invalid-error" v-if="v$?.otp?.$error">
              {{ v$?.otp?.$errors[0]?.$message }}
            </span>
          </div>
          <p class="resend_otpbox">
            Didn’t receive the email?
            <span v-if="otp_timeout_seconds" class="countdown">
              {{ formatTime }}
            </span>
            <button v-if="!otp_timeout_seconds" type="button" @click="sendCode" class="resend_otp">
              Click to resend
            </button>
          </p>
        </div>
      </div>

      <!-- Auth Button Group -->
      <div class="button-group">
        <MainBtn v-if="!isOtpButton" type="green" @click="nextStep">
          {{ $t('auth.loginButton') }}
        </MainBtn>
        <div v-if="!isOtpButton" class="auth-prompt">
          <p>{{ $t('auth.noAccount') }}</p>
          <div class="link" @click="$router.push({ name: 'register' })">
            {{ $t('auth.signUp') }}
          </div>
        </div>
        <MainBtn v-if="isOtpButton" type="green" @click="verifyStep">
          {{ $t('auth.verify') }}
        </MainBtn>
      </div>
    </template>
  </AuthView>
</template>

<style scoped>
.center {
  width: 100%;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.password-options {
  display: flex;
  align-items: space-between;
  width: 100%;
  justify-content: space-between;
}

.remember-me {
  display: flex;
  gap: 8px;
  align-items: center;
}

.remember-me label {
  color: var(--Dark-800, #454545);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.g-login-btn {
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  cursor: pointer;
  font-family: 'ZAIN';
}

.g-login-btn span {
  color: var(--Dark-700, #4f4f4f);
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  margin-top: 3px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.divider {
  margin-top: 10px;
  display: flex;
  align-items: center;
  fill: var(--Gray-300, #d0d5dd);
  text-align: center;
  width: 100%;
  flex-direction: column;
}

.divider::before {
  content: '';
  width: 100%;
  height: 1px;
  flex: 1;
  border-bottom: 3px solid var(--Dark-100, #e7e7e7);
  margin-bottom: -10px;
}

.divider span {
  padding: 0 10px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  background: #fff;
  color: var(--Dark-300, #b0b0b0);
  text-align: center;
  line-height: 20px;
}

.auth-prompt {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
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
.login-error{
  color: red;
}
</style>