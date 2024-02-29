import { Client } from 'entities/Clients'
import { OrderExtended } from 'entities/Order'
import { Project } from 'entities/Project'

export interface ProjectsPageSchema {
  isLoading: boolean,
  data?: Project[],
  orders?: OrderExtended[],
  clients?: Client[],
  error?: string,
}