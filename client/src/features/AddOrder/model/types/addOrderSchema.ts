import {OrderExtended } from '@/entities/Order'
import { Project } from '@/entities/Project'

export interface AddOrderSchema {
  data: OrderExtended,
  projects: Project[]
}
