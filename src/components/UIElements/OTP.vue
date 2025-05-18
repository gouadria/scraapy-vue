<template>
  <div ref="otpCont">
    <input
      type="text"
      class="digit-box"
      v-for="(el, ind) in digits"
      :key="el ? el + ind : ind"
      v-model="digits[ind]"
      :autofocus="ind === 0"
      placeholder="0"
      maxlength="1"
      @keydown="handleKeyDown($event, ind)"
      :class="{ bounce: digits[ind] !== '' }"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    digitCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      digits: Array(this.digitCount).fill('')
    }
  },
  watch: {
    digits() {
      if (this.digits.join('').length === this.digitCount) {
        this.$emit('update:otp', this.digits.join(''))
      }
    }
  },
  methods: {
    handleKeyDown(event: KeyboardEvent, index: number) {
      if (event.key === 'Backspace') {
        this.digits[index] = ''
        if (index !== 0) {
          this.$refs.otpCont.children[index - 1].focus()
        }
        return
      }

      if (new RegExp('^([0-9])$').test(event.key)) {
        this.digits[index] = event.key
        if (index !== this.digitCount - 1) {
          this.$refs.otpCont.children[index + 1].focus()
        }
      }
    }
  }
});
</script>

<style scoped>
.digit-box {
  width: 46px;
  height: 56px;
  padding: 2px 8px;
  border: 2px solid #15B377;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
  font-size: 36px;
  font-weight: 600;
}
.digit-box:focus {
  outline: 1px solid #15B377;
}
.digit-box::placeholder {
  color: #d0d5dd;
}
input[type='text'] {
  text-align: center;
  color: #15B377;
}
.invalid .digit-box {
  border-color: #fda29b;
}
.invalid .digit-box::placeholder {
  color: #f04438;
}
.bounce {
  animation: pulse 0.3s ease-in-out alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}
</style>
