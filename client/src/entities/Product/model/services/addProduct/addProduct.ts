import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../../types/Product'
import { ThunkConfig } from '@/app/providers/StoreProvider'

export const addProduct = createAsyncThunk<Product, Partial<Product>, ThunkConfig<string>>(
    'product/add',
    // @ts-ignore
    async(newProductData, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation Mutation($data: ProductInput) { addProduct(data: $data) { _id name price discount count productType description img category subcategory } }',
                'operation-name': 'Mutation',
                'variables': {'data': newProductData}
            })

            if (!data) {
                return rejectWithValue('Товар не добавлен')
            }

            return data.data.addProduct
        } catch (error) {
            rejectWithValue('Что-то пошло не так. Попробуйте позже')
        }
    }
)