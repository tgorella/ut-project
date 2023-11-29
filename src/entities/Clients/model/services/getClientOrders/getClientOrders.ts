import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { Order } from 'entities/Order'

export const getClientOrders = createAsyncThunk<Order[], string,ThunkConfig<string>>(
    'clientDetails/getClientOrders',
    // @ts-ignore
    async (clientId, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI
        try {
            const authData = getUserAuthData(getState())
            const {data} = await extra.api.get<Order[]>(`/orders?userId=${authData?.id}`, {
                params: {
                    clientId: clientId
                }
            })
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так'))
        }
    }
)