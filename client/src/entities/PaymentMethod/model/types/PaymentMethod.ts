export interface PaymentMethod {
  _id: string,
name: string,
icon_url: string
}

export interface PaymentMethodsSchema {
  isLoading: boolean,
  error?: string,
  data?: PaymentMethod[]
}