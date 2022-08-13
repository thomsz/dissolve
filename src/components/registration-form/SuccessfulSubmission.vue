<template>
  <img
    alt="Profile image"
    class="h-56 w-5/6 object-cover mx-auto rounded"
    :src="profileImage"
  />
  <p>
    Congratulations, {{ fullName }}!<br>
    Your application has been sent.
  </p>
  <p>
    Your changes of winning a new car are 1:{{ totalApplications }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SuccessfulSubmission',

  props: {
    fullName: {
      type: String,
      required: true
    },

    profileImage: {
      type: String,
      required: true
    }
  },

  computed: {
    totalApplications (): number {
      return 20
    }
  }
})
</script>
