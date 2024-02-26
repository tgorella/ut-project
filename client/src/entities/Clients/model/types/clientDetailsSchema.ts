import { Order, OrderExtended } from 'entities/Order'
import { Client } from './clientSchema'

export interface ClientDetailsSchema {
  isLoading: boolean,
  error?: string,
  data?: Client,
  form?: Client,
  orders?: (Order | OrderExtended)[],
  ordersLoading?: boolean
}