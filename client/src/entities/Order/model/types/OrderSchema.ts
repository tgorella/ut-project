import { Client } from 'entities/Clients'
import { OrderStatusDetails } from 'entities/OrderStatus'
import { Project } from 'entities/Project'

export interface OrderDefault {
  _id?: string,
  total?:string,
  notes?:string,
  eventDate?: string,
  eventType?:string,
  orderNumber?:string,
  place?:string,
  startTime?: string,
  endTime?:string,
  title?:string,
  userId?:string,
  createdAt?:string,
  updatedAt?:string,
  steps?: string[]
}

export interface Order extends OrderDefault {
  status?:string ,
  clientId?: string,
  projectType?:string,

}

export interface OrderExtended extends OrderDefault {
  status?: OrderStatusDetails,
  clientId?: Client,
  projectType?:Project,

}
