import { OrderExtended } from './OrderSchema'

export interface OrderDetailsSchema {
  isLoading?: boolean,
  data?: OrderExtended,
  form?: OrderExtended
  error?: string;
}