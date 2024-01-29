import { Order } from 'entities/Order'
import { Project } from 'entities/Project'

export interface AddOrderSchema {
  data: Order,
  projects: Project[]
}
