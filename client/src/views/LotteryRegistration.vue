<template>
  <div class="h-screen flex flex-col">
    <header class="border-b-4 border-stone-100">
      <img
        alt="Brand new car"
        src="@/assets/images/car.jpg"
        class="object-cover h-32 w-full"
      />
      <h1 class="text-2xl font-bold text-white absolute top-0 p-4">Car Lottery 2022</h1>
    </header>
    <main class="p-4 flex flex-1 flex-col gap-6">
      <RegistrationForm />
    </main>
  </div>
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
