export interface OrderStatusDetails {
  id: string,
  name: string,
  color:string,
  isDefault:boolean,
  userId?: string
}

export interface OrderStatusesSchema {
  isLoading: boolean,
  error?: string,
  data?: OrderStatusDetails[],
  form?: OrderStatusDetails[]
}