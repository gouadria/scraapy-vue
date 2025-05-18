<script lang="ts">
import { defineComponent } from 'vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'

export default defineComponent({
  name: 'UpdatePassword',
  components: {
    ModalPopup,
    inputField,
    MainBtn
  },
  props: {
    show: Boolean
  },
  data() {
    return {
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  computed: {
    isPasswordLength() {
      return this.newPassword.length >= 8
    },
    isPasswordSpecial() {
      return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.newPassword)
    }
  },
  validations() {
    return {
      password: {
        required,
        minLength: minLength(8)
      },
      newPassword: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(this.newPassword)
      }
    }
  },
  methods: {
    updatePassword() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return
      }
      this.$userStore
        .dispatch('updatePassword', {
          new_password: this.newPassword,
          current_password: this.password
        })
        .then(() => {
          this.$emit('close')
        })
        .catch(() => {
          console.log('error updating password')
        })
    }
  }
})
</script>
<template>
  <ModalPopup :show="show" @close="$emit('close')" class="updatePassword">
    <template v-slot:title>
      <div class="title-wrapper">
        <div class="title">
          <img src="@/assets/svg-icons/fingerprint.svg?url" />
          {{ $t('updatePassword.title') }}
        </div>
        <div class="subtitle">
          {{ $t('updatePassword.subTitle') }}
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="content">
        <inputField
          type="password"
          :label="$t('updatePassword.currentPassword')"
          :placeholder="$t('updatePassword.currentPasswordPlaceholder')"
          :value="password"
          :error="v$.password.$errors[0]?.$message"
          @update="password = $event"
        />
        <div class="divider"></div>
        <inputField
          type="password"
          :label="$t('updatePassword.newPassword')"
          :placeholder="$t('updatePassword.newPasswordPlaceholder')"
          :value="newPassword"
          :error="v$.newPassword.$errors[0]?.$message"
          @update="newPassword = $event"
        />
        <inputField
          type="password"
          :label="$t('updatePassword.confirmPassword')"
          :placeholder="$t('updatePassword.confirmPasswordPlaceholder')"
          :value="confirmPassword"
          :error="v$.confirmPassword.$errors[0]?.$message"
          @update="confirmPassword = $event"
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
        <div class="btn-group">
          <MainBtn type="green" @click="updatePassword">
            {{ $t('updatePassword.proceed') }}
          </MainBtn>
        </div>
      </div>
    </template>
  </ModalPopup>
</template>

<style scoped>
.title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
}

.subtitle {
  color: var(--Dark-700, #4f4f4f);
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.condition {
  display: flex;
  gap: 8px;
  align-items: center;
}

.condition.valid img {
  filter: invert(20%) sepia(100%) saturate(3673%) hue-rotate(101deg) brightness(97%) contrast(104%);
}

.btn-group {
  display: flex;
  justify-content: flex-end;
}
</style>
<style>
.updatePassword .modal {
  min-width: 25%;
  max-width: 25%;
}
@media (max-width: 1400px) {
  .updatePassword .modal {
    min-width: 40%;
    max-width: 40%;
  }
}
</style>
