import { Client } from 'entities/Clients'

export interface AddClientSchema {
  data: Client,
  added: boolean,
  error?: string
}