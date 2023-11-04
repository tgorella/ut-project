import { Client } from './clientsSchema'

export interface ClientDetailsSchema {
  isLoading: boolean,
  error?: string,
  data?: Client
  form?: Client
}