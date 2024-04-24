import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../../types/Product'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'

export const getProductById = createAsyncThunk<Product, string, ThunkConfig<string>>(
    'products/getProductById',
    // @ts-ignore
    async (id, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'query Query($productId: ID) { product(id: $productId) { subcategory productType price name img discount description count category _id } }',
                'operation-name': 'Query',
                'variables': {'productId': id}
            })
            if (!data) {
                return rejectWithValue(i18n.t('Товар не найден'))
            }
            return data.data.product
        } catch (error) {
            rejectWithValue(i18n.t('Что-то пошло не так'))
        }
    }
)