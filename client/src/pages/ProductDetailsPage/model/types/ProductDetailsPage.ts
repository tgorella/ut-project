import { Product } from  '@/entities/Product'

export interface ProductDetailsPageSchema {
data?: Product,
form?: Product
isLoading: boolean,
error?: string
}