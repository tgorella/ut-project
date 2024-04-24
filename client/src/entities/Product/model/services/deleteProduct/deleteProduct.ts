import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../../types/Product'
import { ThunkConfig } from 'app/providers/StoreProvider'

export const deleteProduct = createAsyncThunk<Product, string, ThunkConfig<string>>(
    'product/delete',
    // @ts-ignore
    async(id, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation Mutation($deleteProductId: ID) { deleteProduct(id: $deleteProductId) }',
                'operation-name': 'Mutation',
                'variables': {'deleteProductId': id}
            })

            if(!data) {
                return rejectWithValue('Что-то пошло не так. Товар не был удален')
            }

            return data.data.deleteProduct
        } catch (error) {
            rejectWithValue('Что-то пошло не так. Попробуйте позже')
        }
    }
)