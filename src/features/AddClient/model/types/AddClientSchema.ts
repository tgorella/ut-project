import { Client } from 'entities/Clients'

export interface AddClientSchema {
  data: Client,
  error?: string
}