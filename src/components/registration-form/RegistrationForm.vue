<template>
  <SuccessfulSubmission v-if="progress.currentStep === Step.SuccessfulSubmission" />
  <form
    v-else
    name="lottery_registration"
    class="h-full flex flex-col justify-between"
    @submit.prevent="submit"
  >
    <FormStep
      v-if="progress.currentStep === Step.Initial"
      name="initial"
      next
      @next="advanceStep"
    >
      <template #description>Initial step</template>
      <input
        name="email"
        type="email"
        v-model="form.email"
        required
        placeholder="email@example.com"
      />
    </FormStep>
    <FormStep
      v-if="progress.currentStep === Step.PersonalDetails"
      name="personal_details"
      next
      back
      @next="advanceStep"
      @back="progress.currentStep--"
    >
      <template #description>Personal details</template>
      <div class="flex items-center gap-2">
        <input
          id="male"
          name="sex"
          type="radio"
          value="male"
          v-model="form.sex"
          required
        />
        <label for="male">Male</label>
        <input
          id="female"
          name="sex"
          type="radio"
          value="female"
          v-model="form.sex"
          required
        />
        <label for="female">Female</label>
      </div>
      <input
        name="first_name"
        v-model="form.name.first"
        required
        placeholder="First name"
      />
      <input
        name="last_name"
        v-model="form.name.last"
        required
        placeholder="Last name"
      />
      <input
        name="birth_date"
        type="date"
        v-model="form.birthDate"
        required
        :max="new Date().toISOString()"
      />
    </FormStep>
    <FormStep
      v-else-if="progress.currentStep === Step.ProfileImageUpload"
      name="profile_image_upload"
      back
      submit
      @back="progress.currentStep--"
    >
      <template #description>Profile image upload</template>
      <input
        name="profile_image"
        type="file"
        @change="handleFile"
      />
    </FormStep>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import FormStep from '@/components/patterns/form-step/FormStep.vue'
import SuccessfulSubmission from '@/components/registration-form/SuccessfulSubmission.vue'

enum Step {
  Initial,
  PersonalDetails,
  ProfileImageUpload,
  SuccessfulSubmission
}

export default defineComponent({
  name: 'RegistrationForm',

  components: {
    FormStep,
    SuccessfulSubmission
  },

  data: () => ({
    Step,
    progress: {
      currentStep: Step.Initial,
      stepReached: Step.Initial
    },
    form: {
      sex: '',
      email: '',
      photo: null,
      birthDate: null,
      name: {
        last: '',
        first: ''
      }
    }
  }),

  computed: {
    stepPrerequisites (): Record<Exclude<Step, Step.Initial>, boolean> {
      const { sex, email, photo, birthDate, name } = this.form
      return {
        [Step.PersonalDetails]: Boolean(email),
        [Step.ProfileImageUpload]: Boolean(sex && name.first && name.last && birthDate),
        [Step.SuccessfulSubmission]: Boolean(photo)
      }
    }
  },

  watch: {
    currentStep (currentStep: Step): void {
      if (currentStep > this.progress.stepReached) {
        this.progress.stepReached = currentStep
      }
    }
  },

  methods: {
    submit (): void {
      console.log('[submit]')
    },

    handleFile (event: Event): void {
      console.log('[handleFile] event', event)
    },

    advanceStep (): void {
      const nextStep = this.progress.currentStep + 1
      if (this.checkPrerequisites(nextStep)) {
        this.progress.currentStep++
      } else {
        this.triggerError()
      }
    },

    triggerError (): void {
      console.log('[triggerError]')
    },

    checkPrerequisites (step: Exclude<Step, Step.Initial>): boolean {
      return this.stepPrerequisites[step]
    }
  }
})
</script>
