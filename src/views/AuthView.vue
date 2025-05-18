<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthView'
})
</script>

<template>
  <div class="auth-view">
    <section class="auth-container">
      <div class="header">
        <img @click="$router.push({ name: 'home' })" src="@/assets/logo.svg?url" alt="logo" />
        <div class="header-text">
          <h1 class="header-title">
            <slot name="title" />
          </h1>
          <h3 class="header-subtitle">
            <slot name="subtitle" />
          </h3>
        </div>
      </div>
      <div class="input-group">
        <transition-group name="slide-fade">
          <slot name="content" />
        </transition-group>
      </div>
    </section>
  </div>
</template>

<style scoped>
.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.auth-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 356px;
}

.header {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 40px;
}

.header img {
  cursor: pointer;
  width: 160px;
  height: 66px;
}

.header-text {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.header-title {
  color: var(--Dark-950, #121212);
  font-size: 30px;
  font-weight: 600;
  line-height: 38px;
}

.header-subtitle {
  color: var(--Dark-700, #4f4f4f);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
</style>
