import { EventType } from '@/entities/EventType'

export interface EventTypesEditSchema {
isLoading: boolean,
data: EventType[],
error?: string,
editTypeId?: string,
newData?: EventType
}