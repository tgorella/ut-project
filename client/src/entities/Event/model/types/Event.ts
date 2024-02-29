import { EventType } from 'entities/EventType'

export interface EventSchema {
isLoading: boolean,
eventDetails?: EventExtended,
formData?: EventExtended,
error?: string
}

export interface EventDefault {
  _id: string,
  title: string,
  userId: string,
  eventDate: string,
  startTime: string,
  endTime: string,
  place: string,
  notes: string
}

export interface Event extends EventDefault {
  eventType: string,
}

export interface EventExtended extends EventDefault {
  eventType: EventType
}