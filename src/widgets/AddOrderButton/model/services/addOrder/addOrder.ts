import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { Order } from 'entities/Order'
import { addOrderButtonAction } from '../../slice/AddOrderButtonSlice'
import { getProfileLastOrderNumber, profileAction, updateProfileData } from 'entities/Profile'
import { getClientDetailsData } from 'entities/Clients'

interface addOrderProps {
  newOrder: Order,
 isClientPage: boolean,
 client?: string
}
export const addOrder = createAsyncThunk<Order, addOrderProps,ThunkConfig<string>>(
    'orderAddButton/addOrder',
    async (props, thunkAPI) => {
        const {newOrder, isClientPage, client} = props
        const {rejectWithValue, extra, dispatch, getState} = thunkAPI
        const authData = getUserAuthData(getState())
        const clientData = getClientDetailsData(getState())
        const lastOrder = getProfileLastOrderNumber(getState())
        
        if (!authData || !newOrder) {
            return rejectWithValue(i18n.t('no data'))
        }
        const updatedOrder = {
            ...newOrder,
            userId: authData.id ,
            id: Date.now().toString(),
            createdAt: Date.now().toString(),
            status: '6467834500aba6813881d4',
            orderNumber: lastOrder,
            clientId: clientData?.id
        }

        if (!isClientPage) {
            updatedOrder.clientId = client
        }
        try {
            const {data} = await extra.api.post<Order>('/orders', {
                ...updatedOrder
            })
            dispatch(profileAction.increaseOrderNumber())
            dispatch(updateProfileData())


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