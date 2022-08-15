<template>
  <section class="flex flex-col flex-1">
    <p class="mb-4 text-slate-500">
      <slot name="description"></slot>
    </p>
    <slot></slot>
    <div class="text-red-400 text-center h-7">{{ errorMessage }}</div>
  </section>
  <nav class="h-24">
    <button>
      {{ cta }}
    </button>
    <button
      v-if="back"
      type="button"
      @click="$emit('back')"
    >
      Back
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'FormStep',

  props: {
    back: Boolean,
    errorMessage: String,

    name: {
      type: String,
      required: true
    },

    ctaType: {
      type: String as PropType<'next' | 'submit'>,
      default: 'next'
    }
  },

  data () {
    return {
      form: this.modelValue
    }
  },

  computed: {
    cta (): string {
      const ctaLabels = {
        next: 'Next step',
        submit: 'Submit'
      }

      return ctaLabels[this.ctaType]
    }
  }
})
</script>
