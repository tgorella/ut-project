import { Order, OrderExtended } from '@/entities/Order'

export interface OrdersPageSchema {
isLoading: boolean,
data?: (OrderExtended | Order)[],
error?: string,
limit: number,
search: string
}