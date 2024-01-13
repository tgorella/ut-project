import { OrderStatusDetails } from 'entities/OrderStatus'

export interface SettingPageSchema {
isLoading: boolean,
orderStatusData: OrderStatusDetails[],
error?: string
}   