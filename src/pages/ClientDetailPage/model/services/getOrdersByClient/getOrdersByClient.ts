import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { Order } from 'entities/Order'
import { getClientDetailsData } from 'entities/Clients'

export const getOrdersByClient = createAsyncThunk<Order[], string,ThunkConfig<string>>(
    'clientDetailsPage/getOrdersByClient',
    // @ts-ignore
    async (search, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI
        try {
            const authData = getUserAuthData(getState())
            const clientData = getClientDetailsData(getState())
            const {data} = await extra.api.get<Order[]>(`/orders?userId=${authData?.id}`, {
                params: {
                    clientId: clientData?.id,
                    q: search
                }
            })
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)