<template>
  <FormStep
    name="personal_details"
    back
  >
    <template #description>And some personal details</template>
    <div class="flex items-center gap-2">
      <input
        id="male"
        name="sex"
        type="radio"
        value="male"
        v-model="form.sex"
        required
        @blur="$emit('field-blur', 'form.sex')"
      />
      <label for="male">Male</label>
      <input
        id="female"
        name="sex"
        type="radio"
        value="female"
        v-model="form.sex"
        required
        @blur="$emit('field-blur', 'form.sex')"
      />
      <label for="female">Female</label>
    </div>
    <input
      name="first_name"
      v-model="form.name.first"
      required
      placeholder="First name"
      @blur="$emit('field-blur', 'form.name.first')"
    />
    <input
      name="last_name"
      v-model="form.name.last"
      required
      placeholder="Last name"
      @blur="$emit('field-blur', 'form.name.last')"
    />
    <input
      name="birth_date"
      type="date"
      v-model="form.birthDate"
      required
      :max="maxDate"
      @blur="$emit('field-blur', 'form.birthDate')"
    />
  </FormStep>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import FormStep from '@/components/patterns/form-step/FormStep.vue'

import type { PropType } from 'vue'
import type { FormData } from '@/components/registration-form/form'

export default defineComponent({
  name: 'PersonalDetails',

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

  computed: {
    maxDate (): string {
      return new Date().toISOString().split('T')[0]
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
