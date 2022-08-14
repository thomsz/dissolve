<template>
  <img
    alt="Profile image"
    class="h-56 w-5/6 object-cover mx-auto rounded"
    :src="contestant.profileImage"
  />
  <p>
    Congratulations, {{ fullName }}!<br>
    Your application has been sent.
  </p>
  <p>
    Your chances of winning a new car are 1:{{ totalContestants }}
  </p>
  <button @click="$emit('reset')">Start a new application</button>
</template>

<script lang="ts">
import request from '@/services/request'
import { defineComponent } from 'vue'

import type Contestant from '@/types/Contestant'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'SuccessfulSubmission',

  props: {
    contestant: {
      type: Object as PropType<Contestant>,
      required: true
    }
  },

  data: () => ({
    totalContestants: 0
  }),

  computed: {
    fullName (): string {
      return `${this.contestant.name.first} ${this.contestant.name.last}`
    }
  },

  created (): void {
    this.fetchContestantCount()
  },

  methods: {
    async fetchContestantCount (): Promise<void> {
      try {
        const response = await request.get('/contestants')
        const contestants: Array<Contestant> = response.data
        this.totalContestants = contestants.length
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
