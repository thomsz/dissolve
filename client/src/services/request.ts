import env from '@/services/env'
import request from 'axios'
import { v4 as uuid } from 'uuid'

import type { AxiosInstance } from 'axios'


const getSessionId = () => {
  const sessionIdKey = 'session-id'
  const sessionId = sessionStorage.getItem(sessionIdKey) 

  if (sessionId) {
    return sessionId
  } else {
    const newSessionId = uuid()
    sessionStorage.setItem(sessionIdKey, newSessionId)
    return newSessionId
  }
}

const generateRequestInstance = (): AxiosInstance => request.create({
  baseURL: env.API_URL,
  headers: {
    'Session-Id': getSessionId()
  }
})

export default generateRequestInstance()
