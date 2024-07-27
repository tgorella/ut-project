export interface Payment {
  _id: string,
  number: string,
  date: string,
  method: string,
  order: string,
  amount: string,
  notes?: string
}

export interface PaymentsSchema {
  isLoading: boolean,
  error?: string,
  data?: Payment[]
}