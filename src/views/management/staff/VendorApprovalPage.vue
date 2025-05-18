<template>
  <div class="header">
    <div class="title">{{ pendingRequestsCount }} {{ $t('management.pendingRequests') }}</div>
  </div>
  <div class="items">
    <div v-if="isLoading" class="loading">{{ $t('management.loading') }}...</div>
    <div v-else-if="!vendors.length" class="no-items">
      {{ $t('management.noPendingRequests') }}
    </div>
    <template v-else>
      <div class="item" v-for="vendor in vendors" :key="vendor.business_profile?.cr_number">
        <div class="content">
          <div class="icon">
            <VendorIcon />
          </div>
          <div class="text">
            <div class="name">{{ vendor.name }}</div>
            <div class="details">
              <div class="commercial-registration">
                <span>{{ $t('management.cr') }}:</span>
                {{ vendor.business_profile?.cr_number || $t('management.notProvided') }}
              </div>
              <div class="email">
                <span>{{ $t('management.email') }}:</span>
                {{ vendor.email }}
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <MainBtn type="cancel" @click="rejectVendor(vendor.business_profile?.cr_number)">
            {{ $t('management.reject') }}
          </MainBtn>
          <MainBtn type="green" @click="approveVendor(vendor.business_profile?.cr_number)">
            <img src="@/assets/svg-icons/white-check.svg?url" alt="Approve Icon" />
            {{ $t('management.approve') }}
          </MainBtn>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import { toast } from 'vue3-toastify'
import VendorIcon from '@/assets/svg-icons/VendorIcon.vue'
interface BusinessProfile {
  cr_number: string
  image: string
  status: string
}

interface User {
  name: string
  email: string
  business_profile: BusinessProfile | null
  user_type: string
}

export default defineComponent({
  components: {
    MainBtn,
    VendorIcon
  },
  data() {
    return {
      vendors: [] as User[],
      isLoading: true
    }
  },
  computed: {
    pendingRequestsCount(): string {
      return this.vendors?.length ? this.vendors.length.toString() : this.$t('management.no')
    }
  },
  methods: {
    async fetchApi() {
      try {
        const response = await this.$axios.get<User[]>('/api/users/staff/')
        this.vendors = response.data || []
        console.log(response)
      } catch (error) {
        console.error('Failed to fetch vendors:', error)
        toast.error(this.$t('errorsMsgs.fetchVendorsFailed'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
        this.vendors = []
      } finally {
        this.isLoading = false
      }
    },
    async approveVendor(commercialRegistration: string | undefined) {
      if (!commercialRegistration) return

      try {
        await this.$axios.post(`/api/users/staff/${commercialRegistration}/approve/`)
        toast.success(this.$t('management.vendorApproved'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
        await this.fetchApi()
      } catch (error) {
        console.error('Failed to approve vendor:', error)
        toast.error(this.$t('errorsMsgs.approveVendorFailed'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
      }
    },
    async rejectVendor(commercialRegistration: string | undefined) {
      if (!commercialRegistration) return
      console.log(commercialRegistration)
      try {
        await this.$axios.post(`/api/users/staff/${commercialRegistration}/reject/`)
        toast.success(this.$t('management.vendorRejected'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
        await this.fetchApi()
      } catch (error) {
        console.error('Failed to reject vendor:', error)
        toast.error(this.$t('errorsMsgs.rejectVendorFailed'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
      }
    }
  },
  mounted() {
    this.fetchApi()
  }
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 20px;
  font-weight: 500;
}

.no-items {
  margin: 2rem 0;
  font-size: 24px;
  color: #888888;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.item {
  display: flex;
  gap: 1rem;
  align-items: center;
  border-radius: 12px;
  padding: 15px 25px;
  border: 1px solid #f6f6f6;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  align-items: flex-start;
}

.content .name {
  font-size: 18px;
  font-weight: 500;
  color: #121212;
}
.text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.details {
  display: flex;
  gap: 1rem;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
}

.commercial-registration,
.email {
  font-weight: 500;
}

.details span {
  color: #b0b0b0;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 0.5rem;
}
</style>
