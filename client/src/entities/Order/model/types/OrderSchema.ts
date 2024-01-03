export interface Order {
  id: string,
  clientId:string,
  total:string,
  notes:string,
  eventDate: string,
  eventType:string,
  orderNumber:string,
  place:string,
  status:string,
  startTime: string,
  endTime:string,
  title:string,
  userId:string,
  createdAt:number,
  updatedAt:number,
  projectType:string,
  steps: string[]
}
