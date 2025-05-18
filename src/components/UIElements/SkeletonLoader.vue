<template>
  <div :class="`skeleton-loader ${type}`">
    <!-- Render based on type -->
    <div
      v-if="type === 'text'"
      class="skeleton-text"
      :style="{ animationDuration: duration + 's' }"
    ></div>
    <div
      v-else-if="type === 'image'"
      class="skeleton-image"
      :style="{ animationDuration: duration + 's' }"
    ></div>

    <!-- Card layout with image and text -->
    <div v-else-if="type === 'card'" class="skeleton-card">
      <div
        class="skeleton-card-image"
        :style="{ animationDuration: duration + 's' }"
      ></div>
      <div
        class="skeleton-card-text"
        :style="{ animationDuration: duration * 0.8 + 's' }"
      ></div>
    </div>

    <!-- Grid layout -->
    <div v-else-if="type === 'grid'" class="skeleton-grid">
      <div
        class="skeleton-grid-item"
        v-for="n in items"
        :key="n"
        :style="{ animationDuration: duration + 's' }"
      ></div>
    </div>

    <!-- List layout -->
    <div v-else-if="type === 'list'" class="skeleton-list-item">
      <div
        class="skeleton-list-item"
        v-for="n in items"
        :key="n"
        :style="{ animationDuration: duration * 0.8 + 's' }"
      ></div>
    </div>
    <div v-else-if="type === 'wave-line'" class="skeleton-wave">
      <div class="skeleton-right">
        <div class="square circle"></div>
      </div>
      <div class="skeleton-left">
        <div class="line h17 w40"></div>
        <div class="line h8 w50"></div>
        <div class="line w65"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SkeletonLoader",
  props: {
    type: {
      type: String as PropType<
        "text" | "image" | "card" | "grid" | "list" | "wave-line"
      >,
      default: "text",
    },
    duration: {
      type: Number,
      default: 1.5,
    },
    items: {
      type: Number,
      default: 6,
    },
  },
});
</script>

<style scoped>
.skeleton-loader {
  display: flex;
  gap: 10px;
}

.skeleton-text {
  background-color: #e0e0e0;
  height: 20px;
  width: 100%;
  animation: loading ease-in-out infinite;
}

.skeleton-image {
  background-color: #e0e0e0;
  height: 200px;
  width: 100%;
  animation: loading ease-in-out infinite;
  border-radius: 8px;
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.skeleton-card-image {
  background-color: #e0e0e0;
  height: 120px;
  border-radius: 8px;
  animation: loading ease-in-out infinite;
}
.skeleton-card-text {
  background-color: #e0e0e0;
  height: 20px;
  width: 70%;
  animation: loading ease-in-out infinite;
}

/* Grid layout */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  width: 100%;
}
.skeleton-grid-item {
  background-color: #e0e0e0;
  height: 100px;
  animation: loading ease-in-out infinite;
  border-radius: 8px;
}

/* List layout */
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  position: relative;
}
.skeleton-list-item {
  background-color: #e0e0e0;
  height: 50px;
  width: 100%;
  animation: loading ease-in-out infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.3;
  }
}
.skeleton-wave {
  padding: 16px;
  width: 100%;
  height: 80px;
  background: #f9fafb;
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
.skeleton-left {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.skeleton-wave .line {
  height: 12px;
  margin-bottom: 6px;
  border-radius: 4px;
  background:  #EAECF0;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(8%, rgba(130, 130, 130, 0.2)),
    color-stop(18%, rgba(130, 130, 130, 0.3)),
    color-stop(33%, rgba(130, 130, 130, 0.2))
  );
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  animation: wave-lines 2s infinite ease-out;
}
.h17 {
  height: 17px;
}
.w40 {
  width: 40%;
}
.m10 {
  margin: 10px;
}
.h8 {
  height: 8px;
}
.w50 {
  width: 50%;
}
.w65 {
  width: 65%;
}
.square {
  height: 20px;
  width: 20px;
  border-radius: 5px;
  background: rgba(130, 130, 130, 0.2);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(8%, rgba(130, 130, 130, 0.2)),
    color-stop(18%, rgba(130, 130, 130, 0.3)),
    color-stop(33%, rgba(130, 130, 130, 0.2))
  );
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  animation: wave-squares 2s infinite ease-out;
}
@keyframes wave-lines {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
@keyframes wave-squares {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
