import { Event } from 'entities/Event'

export interface CalendarPageSchema {
isLoading: boolean,
error?: string,
events?: Event[]
}