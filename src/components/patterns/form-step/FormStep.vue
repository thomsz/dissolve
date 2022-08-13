<template>
  <section>
    <p>
      <slot name="description"></slot>
    </p>
    <slot></slot>
  </section>
  <nav class="h-24">
    <button v-if="submit">Submit</button>
    <button
      v-if="next"
      type="button"
      @click="$emit('next')"
    >
      Next step
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

export default defineComponent({
  name: 'FormStep',

  props: {
    next: Boolean,
    back: Boolean,
    submit: Boolean,

    name: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      form: this.modelValue
    }
  }
})
</script>
