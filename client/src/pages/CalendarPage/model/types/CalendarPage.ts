import { Event } from 'entities/Event'
import { Order } from 'entities/Order'

export interface CalendarPageSchema {
isLoading: boolean,
error?: string,
events?: Event[],
orders?: Order[]
}