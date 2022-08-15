<template>
  <FormStep
    name="profile_image_upload"
    back
    cta-type="submit"
    :error-message="errorMessage"
  >
    <template #description>
      Thank you, {{ fullName }}!<br>
      Please select a profile picture
    </template>
    <div class="flex flex-col justify-center items-center h-full">
      <div class="h-44 w-44 relative flex items-center justify-center bg-slate-100/25 border-4 border-slate-100 rounded-md">
        <UploadIcon class="absolute w-16 mx-auto text-slate-200" />
        <input
          ref="fileInput"
          name="profile_image"
          type="file"
          class="z-10 h-full w-full opacity-0"
          accept="image/*"
          :required="!Boolean(form.profileImage)"
          @change="selectFile"
        />
        <img
          v-if="profileImage"
          alt="Profile image"
          class="absolute object-cover w-full h-full rounded"
          :src="profileImage"
        />
      </div>
    </div>
  </FormStep>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import FormStep from '@/components/patterns/form-step/FormStep.vue'
import { UploadIcon } from '@heroicons/vue/solid'

import type { PropType } from 'vue'
import type { FormData } from '@/components/registration-form/form'

export default defineComponent({
  name: 'ProfileImageUpload',

  components: {
    FormStep,
    UploadIcon
  },

  props: {
    modelValue: {
      type: Object as PropType<FormData['form']>,
      required: true
    },

    profileImage: {
      type: String,
      required: true
    },

    errorMessage: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      form: this.modelValue
    }
  },

  computed: {
    fullName (): string {
      return `${this.form.name.first} ${this.form.name.last}`
    }
  },

  watch: {
    form: {
      deep: true,
      handler (form: FormData['form']) {
        this.$emit('update:modelValue', form)
      }
    }
  },

  methods: {
    selectFile (): void {
      const fileInput = (this.$refs.fileInput as HTMLInputElement & { files: Array<File> })
      const file = fileInput.files[0]

      if (!this.validateFileSize(file)) {
        fileInput.value = ''
        return
      }

      this.form.profileImage = file
      this.$emit('file-selected', file)
    },

    validateFileSize (file: File): boolean {
      const KBInBytes = 1024
      const MBInKB = 1024 * KBInBytes
      const MAX_SIZE_IN_MB = 5
      const sizeExceeding = file.size > MBInKB * MAX_SIZE_IN_MB
      if (sizeExceeding) this.$emit('error', `Profile image should not exceed ${MAX_SIZE_IN_MB}MB`)
      return !sizeExceeding
    }
  }
})
</script>
