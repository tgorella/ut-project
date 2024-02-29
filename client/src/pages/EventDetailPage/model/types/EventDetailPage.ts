import { EventExtended } from 'entities/Event'
import { EventType } from 'entities/EventType'

export interface EventDetailPageSchema {
isLoading: boolean,
error?: string,
data?: EventExtended,
form?: EventExtended,
eventTypes?: EventType[]
}