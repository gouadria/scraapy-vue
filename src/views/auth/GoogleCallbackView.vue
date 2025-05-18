<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginGoogleCallback',
  methods: {
    async loginGoogle() {
      if (!this.$route.query.code) {
        this.$router.push({ name: 'login' })
        return
      }
      await this.$userStore.dispatch('loginGoogle', {
        code: this.$route.query.code,
        state: this.$route.query.state,
      })
        .then(() => {
          if (this.$userStore.getters.hasBusinessProfile) {
            this.$router.push({ name: 'home' })
          } else {
            this.$router.push({ name: 'registerBusiness' })
          }
        })
        .catch(() => {
          console.error('Failed to login with Google')
          this.$router.push({ name: 'login' })
        })
    },
  },
  mounted() {
    this.loginGoogle()
  },
})
</script>
