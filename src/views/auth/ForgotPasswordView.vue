<template>
  <AuthView>
    <template v-slot:title>{{ getTitle }}</template>
    <template v-slot:subtitle>{{ getSubtitle }}</template>
    <template v-slot:content>
      <div class="content">
        <div v-if="step === 0" class="forgot-form">
          <inputField
            :label="$t('auth.email')"
            :error="v$.email?.$errors[0]?.$message"
            :value="email"
            @update="(email = $event), v$.email.$touch()"
            type="email"
            placeholder="email@gmail.com"
            required
          />
          <MainBtn type="green" @click="handleResetPassword">
            {{ $t('auth.sendResetLink') }}
          </MainBtn>
        </div>
        <div v-else class="check-email">
          <MainBtn type="green" @click="goToGmail"> {{ $t('auth.OpenEmailApp') }} </MainBtn>
          <div class="resend">
            {{ $t('auth.DidntReceiveEmail') }}
            <div class="resend-link" @click="handleResetPassword">
              {{ $t('auth.ClickToResend') }}
            </div>
          </div>
        </div>
        <div class="back-to-login" @click="$router.push({ name: 'login' })">
          <img src="@/assets/svg-icons/arrow-left.svg?url" alt="back" />
          {{ $t('auth.backToLogin') }}
        </div>
      </div>
    </template>
  </AuthView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthView from '@/views/AuthView.vue'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default defineComponent({
  name: 'ForgotPasswordView',
  components: {
    AuthView,
    inputField,
    MainBtn
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      step: 0,
      email: ''
    }
  },
  validations() {
    return {
      email: { required, email }
    }
  },
  computed: {
    getTitle() {
      return this.step === 0 ? this.$t('auth.forgotPassword') : this.$t('auth.Checkyouremail')
    },
    getSubtitle() {
      return this.step === 0
        ? this.$t('auth.forgotPasswordText')
        : this.$t('auth.WeSentPassword') + ' ' + this.email
    }
  },
  methods: {
    async handleResetPassword() {
      this.v$.email.$touch()
      if (this.v$.email.$invalid) return
      await this.$userStore
        .dispatch('forgotPassword', { email: this.email })
        .then(() => {
          this.step = 1
        })
        .catch(() => {
          console.log('error')
        })
    },
    goToGmail(): void {
      window.open('https://mail.google.com', '_blank')
    }
  }
})
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.forgot-form,
.check-email {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.resend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.resend-link {
  color: var(--Secondary---500, #15b377);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  cursor: pointer;
}

.back-to-login {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--Secondary---500, #15b377);
}

[lang='ar'] .back-to-login {
  flex-direction: row-reverse;
}

.back-to-login img {
  filter: invert(51%) sepia(69%) saturate(3158%) hue-rotate(126deg) brightness(99%) contrast(84%);
}
</style>
