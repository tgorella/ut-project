import { Client } from 'entities/Clients'
import { Order } from 'entities/Order'
import { Project } from 'entities/Project'

export interface ProjectsPageSchema {
  isLoading: boolean,
  data?: Project[],
  orders?: Order[],
  clients?: Client[],
  error?: string,
}