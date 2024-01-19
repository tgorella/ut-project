export interface Order {
  _id?: string,
  clientId:string,
  total:string,
  notes:string,
  eventDate: string,
  eventType:string,
  orderNumber:string,
  place?:string,
  status:string,
  startTime?: string,
  endTime?:string,
  title:string,
  userId:string,
  createdAt?:string,
  updatedAt?:string,
  projectType:string,
  steps?: string[]
}
