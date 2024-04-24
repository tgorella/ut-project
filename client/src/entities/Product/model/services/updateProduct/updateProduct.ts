import { ThunkConfig } from 'app/providers/StoreProvider'
import { Product } from '../../types/Product'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateProduct = createAsyncThunk<Product, Partial<Product>, ThunkConfig<string>>(
    'product/update',
    // @ts-ignore
    async (newProductData, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI
        const updatedProduct = { ...newProductData }
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation UpdateProduct($data: ProductNewDataInput) { updateProduct(data: $data) { category count description discount img name price productType subcategory } }',
                'operation-name': 'UpdateProduct',
                'variables': {'data': updatedProduct}
            })

            if(!data) {
                return rejectWithValue('Что-то пошло не так. Товар не был обновлен')
            }

            return data.data.updateProduct
        } catch (error) {
            rejectWithValue('Что-то пошло не так')
        }
    }
)