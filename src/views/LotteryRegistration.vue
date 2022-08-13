<template>
  <main class="h-screen p-4 flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-emerald-500">Car Lottery</h1>
    <RegistrationForm />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import RegistrationForm from '@/components/registration-form/RegistrationForm.vue'

export default defineComponent({
  name: 'LotteryRegistration',

  components: {
    RegistrationForm
  }
})
</script>
