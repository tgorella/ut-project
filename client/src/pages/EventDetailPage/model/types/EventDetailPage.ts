import { Event } from 'entities/Event'
import { EventType } from 'entities/EventType'

export interface EventDetailPageSchema {
isLoading: boolean,
error?: string,
data?: Event,
form?: Event,
eventTypes?: EventType[]
}