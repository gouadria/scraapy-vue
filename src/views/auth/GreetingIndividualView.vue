<template>
  <AuthView>
    <template v-slot:title>{{ $t('auth.greetingIndividualTitle') }}</template>
    <template v-slot:subtitle>{{ $t('auth.greetingIndividualSubtitle') }}</template>
    <template v-slot:content>
      <div class="signupStep">
        <progressBar :currentStep="step" :steps="stepTitles" />
      </div>

      <transition name="slide-fade">
        <div class="signupStep" v-if="step === 2">
          <h1>
            {{ $t('auth.welcome') }} <span>{{ $t('auth.scrapy') }}</span>
          </h1>
          <p>{{ $t('auth.welcomeMsg') }}</p>
        </div>
      </transition>
      <div class="button-group">
        <MainBtn type="green" @click="nextStep">{{ $t('auth.Next') }}</MainBtn>
      </div>
    </template>
  </AuthView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthView from '@/views/AuthView.vue'
import progressBar from '@/components/UIElements/progressBar.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'

export default defineComponent({
  name: 'GreetingIndividualView',
  components: {
    AuthView,
    progressBar,
    MainBtn
  },
  data() {
    return {
      step: 2,
      stepTitles: [
        this.$t('auth.basicInfo'),
        this.$t('auth.emailVerification'),
        this.$t('auth.complete')
      ]
    }
  },
  methods: {}
})
</script>

<style scoped></style>
