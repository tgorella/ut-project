import { Client } from './clientSchema'

export interface ClientDetailsSchema {
  isLoading: boolean,
  error?: string,
  data?: Client
  form?: Client
}