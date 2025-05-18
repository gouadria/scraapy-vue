<script lang="ts">
export default {
  name: 'userTypeToggle',
  props: {
    types: {
      type: Object as [],
      required: true,
      validator: (value: any) => {
        return value.length === 2
      }
    },
    selected: {
      type: Number,
      default: 0,
      validator: (value: any) => {
        return value === 0 || value === 1
      }
    }
  },
  data() {
    return {
      selectedType: this.selected === 1
    }
  },
  watch: {
    selectedType: function (val: boolean) {
      this.$emit('selected', val ? 1 : 0)
    }
  }
}
</script>

<template>
  <div class="toggle-container">
    <label class="tag">{{ $t('auth.userTypeQuestion') }}</label>
    <input type="checkbox" id="user-type-toggle" v-model="selectedType" />
    <label class="user-type-toggle" for="user-type-toggle">
      <div class="user-type-lables">
        <span :class="{selectedSpan:selected === 1}">{{ types[0] }}</span>
        <span :class="{selectedSpan:selected === 0}">{{ types[1] }}</span>
      </div>
    </label>

    <div class="background"></div>
  </div>
</template>

<style scoped>
.toggle-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.toggle-container .tag {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.user-type-lables {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
}

.user-type-lables span {
  color: var(--White, #fff);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.user-type-lables .selectedSpan{
  color: #4F4F4F
}

.user-type-toggle {
  width: 247px;
  min-height: 40px;
  position: relative;
  display: block;
  background: #ebebeb;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  transition: 0.3s;
  overflow: hidden;
}

.user-type-toggle:after {
  display: flex;
  align-items: center;
  justify-content: center;
  content: '';
  width: 50%;
  height: 100%;
  position: absolute;
  background: var(--Primary---700, #136a83);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

input {
  width: 100%;
  visibility: hidden;
  position: absolute;
}

input:checked + .user-type-toggle:after {
  transform: translateX(100%);
}

[lang='ar'] input:checked + .user-type-toggle:after {
  transform: translateX(-100%);
}





.background {
  background: #fff;
  z-index: -1;
  position: absolute;
  transition: 0.3s;
}
</style>
