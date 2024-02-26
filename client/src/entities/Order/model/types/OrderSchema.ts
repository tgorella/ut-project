import { Client } from 'entities/Clients'
import { OrderStatusDetails } from 'entities/OrderStatus'

export interface OrderDefault {
  _id?: string,
  clientId:string | Client,
  total:string,
  notes:string,
  eventDate: string,
  eventType:string,
  orderNumber:string,
  place?:string,
  startTime?: string,
  endTime?:string,
  title:string,
  userId:string,
  createdAt?:string,
  updatedAt?:string,
  projectType:string,
  steps?: string[]
}

export interface Order extends OrderDefault {
  status:string,
}

export interface OrderExtended extends OrderDefault {
  status: OrderStatusDetails
}
