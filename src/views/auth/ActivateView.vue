<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ActivateView',
  methods: {
    async activateAccount() {
      await this.$userStore.dispatch('activateUser', {
        uid: this.$route.params.id,
        token: this.$route.params.token,
      })
        .then(() => {
          if (this.$userStore.getters.hasBusinessProfile) {
            this.$router.push({ name: 'home' })
          } else {
            this.$router.push({ name: 'registerBusiness' })
          }
        })
        .catch(() => {
          console.error('Failed to activate account')
          this.$router.push({ name: 'login' })
        })
    },
  },
  mounted() {
    this.activateAccount()
  },
})
</script>
