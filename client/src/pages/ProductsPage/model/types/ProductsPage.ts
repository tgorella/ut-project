import { Product } from '@/entities/Product'

export interface ProductsPageSchema {
isLoading: boolean,
error?: string,
data?: Product[],
search: string,
limit: number
}