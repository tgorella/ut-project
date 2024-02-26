import { Client } from 'entities/Clients'
import { Order, OrderExtended } from 'entities/Order'
import { Project } from 'entities/Project'

export interface ProjectsPageSchema {
  isLoading: boolean,
  data?: Project[],
  orders?: (OrderExtended | Order)[],
  clients?: Client[],
  error?: string,
}