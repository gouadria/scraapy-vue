<script lang="ts">
import { defineComponent } from 'vue'
import Loader from '@/assets/svg-icons/listings/loader.svg?url'
import Alert from '@/assets/svg-icons/listings/alert.svg?url'
import Live from '@/assets/svg-icons/listings/live.svg?url'

export default defineComponent({
  name: 'ApprovalBadge',
  props: {
    status: {
      type: String,
      required: true,
      default: ''
    },
    showBadge: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    badgeClass(): object {
      return {
        approved: this.status === 'approved',
        rejected: this.status === 'rejected',
        pending: this.status === 'pending'
      }
    },
    statusText(): string {
      switch (this.status) {
        case 'approved':
          return this.$t('itemCard.Live')
        case 'rejected':
          return this.$t('itemCard.Rejected')
        case 'pending':
          return this.$t('itemCard.Pending')
        default:
          return ''
      }
    },
    statusIcon(): string {
      switch (this.status) {
        case 'approved':
          return Live
        case 'rejected':
          return Alert
        case 'pending':
          return Loader
        default:
          return ''
      }
    }
  }
})
</script>

<template>
  <div class="item-badge" :class="badgeClass" v-if="showBadge && status">
    <div class="badge-content">
      <img :src="statusIcon" />
      {{ statusText }}
    </div>
  </div>
</template>

<style scoped>
.item-badge {
  position: absolute;
  width: 300px;
  padding: 5px 90px;
  box-sizing: border-box;
  background-color: #15b377;
  transform: rotateZ(-45deg);
  top: 0;
  left: 0;
  transform-origin: 120px 160px;
  text-align: center;
}

.item-badge.approved {
  background-color: #15b377;
}

.item-badge.rejected {
  background-color: #f04438;
}

.item-badge.pending {
  background-color: #136a83;
}

.badge-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: var(--White, #fff);
}

.badge-content img {
  width: 16px;
  height: 16px;
}
</style>
