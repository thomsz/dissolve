<template>
  <FormStep name="initial">
    <template #description>To start, please provide your email address</template>
    <input
      name="email"
      type="email"
      v-model="form.email"
      required
      placeholder="email@example.com"
      @blur="$emit('field-blur', 'form.email')"
    />
  </FormStep>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import FormStep from '@/components/patterns/form-step/FormStep.vue'

import type { PropType } from 'vue'
import type { FormData } from '@/components/registration-form/form'

export default defineComponent({
  name: 'InitialStep',

  components: {
    FormStep
  },

  props: {
    modelValue: {
      type: Object as PropType<FormData['form']>,
      required: true
    }
  },

  data () {
    return {
      form: this.modelValue
    }
  },

  watch: {
    form: {
      deep: true,
      handler (form: FormData['form']) {
        this.$emit('update:modelValue', form)
      }
    }
  }
})
</script>
