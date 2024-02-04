
export interface EventSchema {
isLoading: boolean,
eventDetails: Event,
formData: Event,
error?: string
}

export interface Event {
  _id?: string,
  title: string,
  userId: string,
  eventType: string,
  eventDate: string,
  startTime: string,
  endTime: string,
  place: string,
  notes: string
}
