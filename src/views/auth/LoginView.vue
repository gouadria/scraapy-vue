<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
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
    return { v$: useVuelidate() }
  },
  data() {
    return {
      step: 1,
      isPasswordLogin: true,
      rememberMe: false,
      email: '',
      otp: '',
      password: '',
      otp_timeout_seconds: 0,
      loginError: false
    }
  },
  computed: {
    loginMethodText() {
      return this.isPasswordLogin ? this.$t('auth.loginWithSSO') : this.$t('auth.loginWithPassword')
    },
    formatTime() {
      const minutes = Math.floor(this.otp_timeout_seconds / 60)
      const seconds = this.otp_timeout_seconds % 60
      return '' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds)
    }
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
        email: helpers.withMessage(() => this.$t('validations.email'), email)
      },
      password: {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
        minLength: helpers.withMessage(
          () => this.$t('validations.minLength', { min: 8 }),
          minLength(8)
        )
      },
      otp: { minLength: minLength(6) }
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
    handleUpdate(field, value) {
      this.v$[field].$touch()
      this[field] = value
    },
    startCountdown() {
      const contdown_time_sec = 120

      this.otp_timeout_seconds = contdown_time_sec
      const interval = setInterval(() => {
        if (this.otp_timeout_seconds > 0) {
          this.otp_timeout_seconds--
        } else {
          clearInterval(interval)
        }
      }, 1000)
    },
    nextStep() {
      if (this.isPasswordLogin) {
        this.v$.email.$touch()
        this.v$.password.$touch()
        if (!this.v$.email.$invalid && !this.v$.password.$invalid) {
          this.postLogin()
        }
        return
      }
      // OTP login
      if (this.step === 1) {
        this.step = 2
        this.startCountdown()
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    async postLogin() {
      await this.$userStore
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'marketplace' })
        })
        .catch((error) => {
          this.loginError = true
          console.log('error:', error )
        })
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
            <p>{{ $t('auth.loginError') }}</p>
          </div>
        </div>
        <inputField
          :label="$t('auth.email')"
          :error="v$.email?.$errors[0]?.$message"
          :value="email"
          @submit="nextStep"
          @update="handleUpdate('email', $event)"
          type="email"
          placeholder="example@email.com"
          required
        />
        <transition name="slide-fade">
          <inputField
            v-if="isPasswordLogin"
            :label="$t('auth.password')"
            :error="v$.password?.$errors[0]?.$message"
            :value="password"
            @update="handleUpdate('password', $event)"
            @submit="nextStep"
            type="password"
            placeholder="••••••••••••"
            required
          />
        </transition>
        <transition name="slide-fade">
          <div class="password-options" v-if="isPasswordLogin">
            <div class="link" @click="$router.push({ name: 'forgotPassword' })">
              {{ $t('auth.forgotPassword') }}
            </div>
          </div>
        </transition>
      </div>

      <div v-if="step === 2" class="otp-form">
        <div class="otp_data">
          <div class="form-info">
            <h1>Check your email</h1>
            <p>Enter the OTP sent to {{ email }}</p>
          </div>
          <div class="form-control">
            <OTP
              :digit-count="6"
              @update:otp="updateOTP"
              v-model="otp"
              class="otp"
              :class="{ invalid_input_border: v$?.otp?.$errors[0]?.$message }"
            ></OTP>
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
        <MainBtn type="green" @click="nextStep">
          {{ $t('auth.loginButton') }}
        </MainBtn>
        <div class="divider">
          <span>{{ $t('auth.or') }}</span>
        </div>
        <button class="g-login-btn" @click="googleLogin">
          <img class="logo" src="@/assets/glogo.svg?url" alt="googlelogin" />
          <span>{{ $t('auth.loginWithGoogle') }}</span>
        </button>
        <div class="auth-prompt">
          <p>{{ $t('auth.noAccount') }}</p>
          <div class="link" @click="$router.push({ name: 'register' })">
            {{ $t('auth.signUp') }}
          </div>
        </div>
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
