<template>
  <ModalPopup
    :show="show"
    @close="$emit('close')"
  >
    <template v-slot:title>
      Password Verification
    </template>
    <template v-slot:subtitle>
      Please enter your password to continue
    </template>
    <template v-slot:content>
      <div class="content">
        <inputField
          type="password"
          label="Password"
          placeholder="Enter Password"
          :value="password"
          @update="password = $event"
        />
        <div class="btn-group">
          <MainBtn type="green" @click="$emit('submit', password)">Submit</MainBtn>
        </div>
      </div>
    </template>
  </ModalPopup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'

export default defineComponent({
  components: {
    ModalPopup,
    inputField,
    MainBtn
  },
  props: {
    show: Boolean
  },
  data() {
    return {
      password: ''
    }
  }
})
</script>
