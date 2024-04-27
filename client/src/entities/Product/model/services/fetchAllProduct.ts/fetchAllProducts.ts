import { createAsyncThunk } from '@reduxjs/toolkit'
import i18n from 'shared/config/i18n/i18n'
import { Product } from '../../types/Product'
import { ThunkConfig } from 'app/providers/StoreProvider'

interface FetchProps {
  resParams: string,
  search: string
}

export const fetchAllProducts = createAsyncThunk<Product[], FetchProps, ThunkConfig<string>>(
    'productsPage/fetchAllProducts',
    // @ts-ignore
    async (props, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': `query Query($data: String) { filteredProducts(data: $data) { ${props.resParams} } }`,
                'operation-name': 'Query',
                'variables': {'data': props.search}
            })
  
            if (!data) {
                return rejectWithValue(i18n.t('Заказы не найдены'))
            }
            return data.data.filteredProducts
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)