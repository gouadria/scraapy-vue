<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useIsMobile } from '@/composables/useIsMobile';
import inputField from '@/components/UIElements/inputField.vue';
import SarIcon from '@/assets/svg-icons/SAR.svg';

export default defineComponent({
  name: 'shippingOption',
  components: {
    inputField,
  },
  props: {
    identifier: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number as PropType<number | null>,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMobile: useIsMobile().isMobile,
      // Use the selected prop as the source of truth for checked state.
      checked: this.selected,
      SarIcon: SarIcon,
    };
  },
  watch: {
    // Update internal checked state whenever the parent value changes.
    selected(newVal) {
      this.checked = newVal;
    },
  },
  computed: {
    formattedNumber(): string {
      return this.price != null ? this.price.toFixed(2) : '-';
    },
    isSelectable(): boolean {
      return this.price != null;
    },
  },
  methods: {
    // Instead of toggling the value, only emit if the option is not already selected.
    onOptionSelected() {
      if (!this.isSelectable) return;
      // If already selected, do nothing (or you could optionally unselect, if needed)
      if (this.checked) return;
      // Emit the identifier (converted to a number if needed)
      this.$emit('selected-option', Number(this.identifier));
    },
  },
});
</script>

<template>
  <div
    class="option-container"
    :class="{ selected: checked, unselectable: !isSelectable }"
    @click="isSelectable && onOptionSelected()"
  >
    <div class="option-header">
      <div class="option-title">
        <div class="icon-container">
          <img src="@/assets/svg-icons/shipping.svg?url" alt="Shipping" />
        </div>
        <h3>{{ name }}</h3>
      </div>
      <!-- Use checkbox; the checked state is driven solely by the parent -->
      <inputField
        type="checkbox"
        name="shipping-option"
        :checked="checked"
        :disabled="!isSelectable"
        @update="onOptionSelected"
        @click.stop
      />
    </div>
    <div class="option-details">
      <p class="price-tag">
        <SarIcon class="SAR" /> {{ formattedNumber }}
      </p>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.option-container.unselectable {
  opacity: 0.5;
  cursor: not-allowed;
}

.option-container {
  display: flex;
  width: 353px;
  max-width: 353px;
  flex-direction: column;
  align-items: flex-start;
  background: var(--White, #fff);
}

.option-container.selected .option-header,
.option-container.selected .option-details {
  border: 1px solid var(--Secondary---500, #15b377);
}

.option-container.selected .option-details {
  border-top: none;
}

.option-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px 12px 0px 0px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  padding: 16px;
  transition: border 0.8s ease;
}

.option-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.option-title h3 {
  color: var(--Dark-700, #4f4f4f);
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.icon-container {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 28px;
  border: 6px solid var(--Green-50, #edfcf4);
  background: var(--Green-100, #d2f9e3);
  mix-blend-mode: multiply;
}

.option-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 0px 0px 12px 12px;
  border: 1px solid var(--Dark-100, #e7e7e7);

  border-top: none;
  padding: 16px;
}

.price-tag {
  color: var(--Secondary---500, #15b377);
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}
</style>
