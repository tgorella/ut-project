export enum ProductType {
  SERVICE = 'service',
  PRODUCT = 'product',
}
export interface Product {
  _id: string,
  name: string,
  productCode: string,
  price: number,
  discount: number,
  count: number,
  productType: ProductType,
  description: string,
  img: string[],
  category: string,
  subcategory: string,
  userId: string,
}

export interface ProductDetailsSchema {
  isLoading: boolean,
  error?: string,
  data?: Product,
  form?: Product
}