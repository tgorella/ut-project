import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Order } from 'entities/Order'
import httpService from 'shared/api/api'

export const getClientOrders = createAsyncThunk<Order[], string,ThunkConfig<string>>(
    'clientDetails/getClientOrders',
    // @ts-ignore
    async (clientId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const {data} = await httpService.get<Order[]>('/orders/', {
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