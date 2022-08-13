import env from '@/services/env'
import request from 'axios'

import type { AxiosInstance } from 'axios'

const generateRequestInstance = (): AxiosInstance => request.create({
  baseURL: env.API_URL
})

export default generateRequestInstance()
