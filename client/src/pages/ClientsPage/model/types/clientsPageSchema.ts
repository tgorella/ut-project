import { EntityState } from '@reduxjs/toolkit'
import { Client } from '@/entities/Clients'

export interface ClientsPageSchema extends EntityState<Client> {
isLoading?: boolean,
error?: string,
limit: number,
_inited: boolean
}