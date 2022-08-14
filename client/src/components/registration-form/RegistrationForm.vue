<template>
  <SuccessfulSubmission
    v-if="contestant"
    :contestant="contestant"
  />
  <form
    v-else
    name="lottery_registration"
    class="h-full flex flex-col justify-between"
    @submit.prevent="submit"
  >
    <FormStep
      v-if="progress.currentStep === Step.Initial"
      name="initial"
      :error-message="error"
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
      back
      :error-message="error"
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
        :max="maxDate"
      />
    </FormStep>
    <FormStep
      v-else-if="progress.currentStep === Step.ProfileImageUpload"
      name="profile_image_upload"
      back
      cta-type="submit"
      :error-message="error"
      @back="progress.currentStep--"
    >
      <template #description>
        Thank you, {{ fullName }}!<br>
        Please select a profile picture
      </template>
      <div class="flex flex-col justify-center items-center h-full">
        <div class="h-56 w-5/6 relative flex items-center justify-center bg-slate-100/25 border-4 border-slate-100 rounded-md">
          <UploadIcon class="absolute w-16 mx-auto text-slate-200" />
          <input
            ref="fileInput"
            name="profile_image"
            type="file"
            class="z-10 h-full w-full opacity-0"
            accept="image/*"
            required
            @change="selectFile"
          />
          <img
            v-if="profileImageDisplayURL"
            alt="Profile image"
            class="absolute object-cover w-full h-full rounded"
            :src="profileImageDisplayURL"
          />
        </div>
      </div>
    </FormStep>
  </form>
</template>

<script lang="ts">
import request from '@/services/request'
import { getFormData } from '@/services/data'
import { defineComponent } from 'vue'

import FormStep from '@/components/patterns/form-step/FormStep.vue'
import SuccessfulSubmission from '@/components/registration-form/SuccessfulSubmission.vue'
import { UploadIcon } from '@heroicons/vue/solid'

import type Contestant from '@/types/Contestant'

enum Step {
  Initial,
  PersonalDetails,
  ProfileImageUpload,
  SubmittingForm
}

export default defineComponent({
  name: 'RegistrationForm',

  components: {
    FormStep,
    UploadIcon,
    SuccessfulSubmission
  },

  data: () => ({
    Step,
    error: '',
    contestant: null as Contestant | null,
    profileImageDisplayURL: '',
    progress: {
      currentStep: Step.Initial,
      stepReached: Step.Initial
    },
    form: {
      sex: '',
      email: '',
      birthDate: null,
      profileImage: null as File | null,
      name: {
        last: '',
        first: ''
      }
    }
  }),

  computed: {
    maxDate (): string {
      return new Date().toISOString().split('T')[0]
    },

    fullName (): string {
      return `${this.form.name.first} ${this.form.name.last}`
    },

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

      if (currentStep > this.progress.stepReached) {
        this.progress.stepReached = currentStep
      }
    }
  },

  methods: {
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
      } catch (error) {
        console.error(error)
      }
    },

    resetError (): void {
      this.error = ''
    },

    selectFile (): void {
      const fileInput = (this.$refs.fileInput as HTMLInputElement & { files: Array<File> })
      const file = fileInput.files[0]
      if (!this.validateFileSize(file)) {
        fileInput.value = ''
        return
      }

      this.form.profileImage = file
      this.profileImageDisplayURL = URL.createObjectURL(file)
    },

    advanceStep (): void {
      const nextStep = this.progress.currentStep + 1
      if (this.checkPrerequisites(nextStep)) {
        this.progress.currentStep++
      }
    },

    validateFileSize (file: File): boolean {
      const KBInBytes = 1024
      const MBInKB = 1024 * KBInBytes
      const MAX_SIZE_IN_MB = 5
      const sizeExceeding = file.size > MBInKB * MAX_SIZE_IN_MB
      if (sizeExceeding) this.error = `Profile image should not exceed ${MAX_SIZE_IN_MB}MB`
      return !sizeExceeding
    },

    checkPrerequisites (step: Exclude<Step, Step.Initial>): boolean {
      return this.stepPrerequisites[step]
    }
  }
})
</script>
