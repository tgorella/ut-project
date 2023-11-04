import { Client } from './clientsSchema'

export interface clientDetailsSchema {
  isLoading: boolean,
  error?: string,
  data?: Client
  form?: Client
}