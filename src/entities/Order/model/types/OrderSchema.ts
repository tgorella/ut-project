export interface Order {
  id: string,
  clientId:string,
  total:number,
  notes:string,
  eventDate: string,
  eventType:string,
  orderNumber:number,
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
