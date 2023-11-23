import { Order } from 'entities/Order'

export interface OrdersPageSchema {
isLoading: boolean,
data?: Order[],
error?: string,
limit: number,
search: string
}