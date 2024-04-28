import { EventExtended } from '@/entities/Event'

export interface CalendarPageSchema {
isLoading: boolean,
error?: string,
events?: EventExtended[]
}