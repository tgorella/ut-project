import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Product } from '../../types/Product'
import { ThunkConfig } from '@/app/providers/StoreProvider'

interface OrdersByCategoryProps {
  category: string,
  resParams: string
}
export const getProductsByCategory = createAsyncThunk<Product[], OrdersByCategoryProps, ThunkConfig<string>>(
    'products/getProductsByCategory',
    // @ts-ignore
    async ({category, resParams}, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI

        try {
            const {data} = await extra.api.post('/', {
                'query': `query Query($category: String) { productsByCategory(category: $category) { ${resParams} } }`,
                'operation-name': 'Query',
                'variables': {'category': category}
            })

            if (!data) {
                return rejectWithValue('Товары не найдены')
            }

            return data.data.productsByCategory
        } catch (error) {
            rejectWithValue('Что-то пошло не так')
        }
    }
)