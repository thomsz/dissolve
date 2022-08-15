import request from "./request"

export enum AnalyticsEvent {
  Navigation = 'navigation',
  Contestant = 'contestant'
}

export enum EventLabel {
  CurrentStep = 'current_step',
  ContestantCreated = 'contestant_created'
}

type AnalyticsPayload = {
  data: unknown,
  label: EventLabel
}

export default {
  track: async (event: AnalyticsEvent, payload: AnalyticsPayload): Promise<void> => {
    try {
      await request.post('/analytics', {
        date: new Date(),
        event,
        payload
      })
    } catch (error) {
      console.error(error)
    }
  }
}