import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Product } from '../../types/Product'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProductDetailsForm } from '../../selectors/getProductDetailsForm/getProductDetailsForm'

export const updateProduct = createAsyncThunk<Product, string, ThunkConfig<string>>(
    'product/update',
    // @ts-ignore
    async (id, thunkAPI) => {
        const { getState, rejectWithValue, extra } = thunkAPI
        const newData = getProductDetailsForm(getState())

        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation UpdateProduct($data: ProductNewDataInput) { updateProduct(data: $data) { _id name price discount count productType description img category subcategory productCode } }',
                'operation-name': 'UpdateProduct',
                'variables': {'data': newData}
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