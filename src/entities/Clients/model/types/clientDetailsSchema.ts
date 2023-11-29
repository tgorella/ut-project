import { Order } from 'entities/Order'
import { Client } from './clientSchema'

export interface ClientDetailsSchema {
  isLoading: boolean,
  error?: string,
  data?: Client,
  form?: Client,
  orders?: Order[],
  ordersLoading?: boolean
}