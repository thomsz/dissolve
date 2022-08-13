<template>
  <RegistrationForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import RegistrationForm from '@/views/LotteryRegistration.vue'

export default defineComponent({
  name: 'App',

  components: {
    RegistrationForm
  }
})
</script>
