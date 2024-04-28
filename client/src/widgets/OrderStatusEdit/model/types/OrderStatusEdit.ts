import { OrderStatusDetails } from '@/entities/OrderStatus'

export interface OrderStatusEditSchema {
isLoading: boolean,
data: OrderStatusDetails[],
error?: string,
editStatusId?: string,
newData?: OrderStatusDetails
}