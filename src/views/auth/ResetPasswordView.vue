<template>
  <AuthView focused>
    <template v-slot:title>{{ $t('auth.SetNewpassword') }}</template>
    <template v-slot:subtitle>{{ $t('auth.SetNewpasswordText') }}</template>
    <template v-slot:content>
      <div class="password-form">
        <inputField
          label="password"
          :error="v$.password?.$errors[0]?.$message"
          :value="password"
          @update="(password = $event), v$.password.$touch()"
          type="password"
          placeholder="password"
          required
        />
        <inputField
          label="confirm password"
          :error="v$.confirmPassword?.$errors[0]?.$message"
          :value="confirmPassword"
          @update="(confirmPassword = $event), v$.confirmPassword.$touch()"
          type="password"
          placeholder="confirm password"
          required
        />
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
      <MainBtn type="green" @click="resetPassword">
        {{ $t('auth.ResetPassword') }}
      </MainBtn>

      <ModalComponent
        :modal-active="isActive"
        @close="openResetSuccess"
        :closeActive="true"
        class="reset_successful"
      >
        <div class="successful">
          <img src="@/assets/svg-icons/logo-sqaure.svg?url" alt="check" />
          <h2>{{ $t('auth.PasswordResetSuccessful') }}</h2>
          <p>{{ $t('auth.PasswordResetSuccessfulText') }}</p>
          <MainBtn @click="goToLogin">{{ $t('auth.close') }}</MainBtn>
        </div>
      </ModalComponent>
    </template>
  </AuthView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'
import AuthView from '@/views/AuthView.vue'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import ModalComponent from '@/components/UIElements/ModalComponent.vue'
export default defineComponent({
  name: 'ResetPasswordView',
  components: {
    AuthView,
    inputField,
    MainBtn,
    ModalComponent
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      isActive: false
    }
  },
  computed: {
    isPasswordLength() {
      return this.password.length >= 8
    },
    isPasswordSpecial() {
      return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.password)
    }
  },
  validations() {
    return {
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(this.password)
      }
    }
  },
  methods: {
    async resetPassword() {
      if (this.v$.$invalid) return
      await this.$userStore
        .dispatch('resetPassword', {
          uid: this.$route.params.uid,
          token: this.$route.params.token,
          new_password: this.password
        })
        .then(() => {
          // this.$router.push({ name: 'login' })
          this.openResetSuccess()
        })
        .catch((error: any) => {
          console.error('Failed to reset password', error)
        })
    },
    openResetSuccess() {
      this.isActive = !this.isActive
    },
    goToLogin() {
      // this.openResetSuccess()
      this.$router.push({ name: 'login' })
    }
  }
})
</script>

<style scoped>
.password-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
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

.successful {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
  padding: 48px;
}
</style>
<style>
.reset_successful .modal-content {
  width: unset;
}
</style>
