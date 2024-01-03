import { Order } from './OrderSchema'

export interface OrderDetailsSchema {
  isLoading?: boolean,
  data?: Order,
  form?: Order
  error?: string;
}