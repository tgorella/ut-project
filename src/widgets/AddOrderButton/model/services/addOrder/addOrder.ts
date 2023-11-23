import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { Order } from 'entities/Order'
import { addOrderButtonAction } from '../../slice/AddOrderButtonSlice'


export const addOrder = createAsyncThunk<Order, Order,ThunkConfig<string>>(
    'orderAddButton/addOrder',
    async (newOrder, thunkAPI) => {
        const {rejectWithValue, extra, dispatch, getState} = thunkAPI
        const authData = getUserAuthData(getState())
        
        if (!authData || !newOrder) {
            return rejectWithValue(i18n.t('no data'))
        }

        try {
            const {data} = await extra.api.post<Order>('/orders', {
                ...newOrder,
                userId: authData.id ,
                id: Date.now().toString(),
                createdAt: Date.now().toString()
            })

            if (!data) {
                throw new Error('err')
            }
            setTimeout(() => {
                dispatch(addOrderButtonAction.reset())
            }, 3000)
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)