import type Contestant from '@/types/Contestant'

export enum Step {
  Initial,
  PersonalDetails,
  ProfileImageUpload,
  SubmittingForm
}

export type FormData = {
  Step: typeof Step
  error: string
  contestant: Contestant | null
  profileImageDisplayURL: string
  progress: {
    currentStep: Step
    stepReached: Step
  }
  form: {
    sex: string
    email: string
    birthDate: string | null
    profileImage: File | null
    name: {
      last: string
      first: string
    }
  }
}

export const initialData: FormData = {
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
}
