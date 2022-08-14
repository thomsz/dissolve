<template>
  <SuccessfulSubmission
    v-if="contestant"
    :contestant="contestant"
    @reset="reset"
  />
  <form
    v-else
    name="lottery_registration"
    class="h-full flex flex-col justify-between"
    @submit.prevent="submit"
  >
    <InitialStep
      v-if="progress.currentStep === Step.Initial"
      v-model="form"
      @field-blur="persistData"
    />
    <PersonalDetails
      v-if="progress.currentStep === Step.PersonalDetails"
      v-model="form"
      @back="goBack"
      @field-blur="persistData"
    />
    <ProfileImageUpload
      v-else-if="progress.currentStep === Step.ProfileImageUpload"
      v-model="form"
      :error-message="error"
      :profile-image="profileImageDisplayURL"
      @back="goBack"
      @error="setError"
      @field-blur="persistData"
      @file-selected="setProfileImageToDisplay"
    />
  </form>
</template>

<script lang="ts">
import get from 'lodash/get'
import request from '@/services/request'
import { defineComponent } from 'vue'
import { Step, initialData } from '@/components/registration-form/form'
import { getFormData, flattenObject, populateDataFromSessionStorage } from '@/services/data'

import InitialStep from '@/components/registration-form/steps/InitialStep.vue'
import PersonalDetails from '@/components/registration-form/steps/PersonalDetails.vue'
import ProfileImageUpload from '@/components/registration-form/steps/ProfileImageUpload.vue'
import SuccessfulSubmission from '@/components/registration-form/SuccessfulSubmission.vue'

import type Contestant from '@/types/Contestant'
import type { FormData } from '@/components/registration-form/form'

export default defineComponent({
  name: 'RegistrationForm',

  components: {
    InitialStep,
    PersonalDetails,
    ProfileImageUpload,
    SuccessfulSubmission
  },

  data: () => populateDataFromSessionStorage<FormData>(initialData),

  computed: {
    stepPrerequisites (): Record<Exclude<Step, Step.Initial>, boolean> {
      const { sex, name, email, profileImage, birthDate } = this.form
      return {
        [Step.SubmittingForm]: Boolean(profileImage),
        [Step.PersonalDetails]: Boolean(email),
        [Step.ProfileImageUpload]: Boolean(sex && name.first && name.last && birthDate),
      }
    }
  },

  watch: {
    'progress.currentStep' (currentStep: Step): void {
      this.resetError()
      this.persistData('progress.currentStep')

      if (currentStep > this.progress.stepReached) {
        this.progress.stepReached = currentStep
        this.persistData('progress.stepReached')
      }
    }
  },

  methods: {
    reset (): void {
      Object.assign(this.$data, initialData)
      this.resetDataFromSessionStorage()
    },

    async submit (): Promise<void> {
      this.advanceStep()
      const stepPrerequisites = this.stepPrerequisites
      const allPrerequisitesFullfilled = Object.values(stepPrerequisites).every(prerequisite => prerequisite)
      if (!allPrerequisitesFullfilled) return

      try {
        const response = await request.post('/contestants', getFormData(this.form), {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const contestant: Contestant = response.data
        this.contestant = contestant
        this.persistData('contestant')
      } catch (error) {
        console.error(error)
      }
    },

    goBack (): void {
      this.progress.currentStep--
    },

    setError (error: string): void {
      this.error = error
    },

    resetError (): void {
      this.error = ''
    },

    advanceStep (): void {
      const nextStep = this.progress.currentStep + 1
      if (this.checkPrerequisites(nextStep)) {
        this.progress.currentStep++
      }
    },

    persistData (...keys: Array<string>): void {
      keys.forEach(key => {
        const value = get(this, key)
        const preparedValue = typeof value === 'object' && !(value instanceof File)
          ? JSON.stringify(value)
          : value

        sessionStorage.setItem(key, preparedValue)
      })
    },

    checkPrerequisites (step: Exclude<Step, Step.Initial>): boolean {
      return this.stepPrerequisites[step]
    },

    setProfileImageToDisplay (file: File): void {
      this.profileImageDisplayURL = URL.createObjectURL(file)
      this.persistData('form.profileImage', 'profileImageDisplayURL')
    },

    resetDataFromSessionStorage (): void {
      const flattenedData = flattenObject(initialData)
      Object.keys(flattenedData).forEach(key => {
        sessionStorage.removeItem(key)
      })
    }
  }
})
</script>
