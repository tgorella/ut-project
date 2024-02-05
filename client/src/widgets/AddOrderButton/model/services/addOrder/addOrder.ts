import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { Order } from 'entities/Order'
import { addOrderButtonAction } from '../../slice/AddOrderButtonSlice'
import { getProfileLastOrderNumber, profileAction, updateProfileData } from 'entities/Profile'
import { getClientDetailsData } from 'entities/Clients'
import { getNewOrderData } from 'features/AddOrder/model/selectors/getNewOrderData/getNewOrderData'
import httpService from 'shared/api/api'

interface addOrderProps {
 isClientPage: boolean,
 clientId?: string
}

export const addOrder = createAsyncThunk<Order, addOrderProps,ThunkConfig<string>>(
    'orderAddButton/addOrder',
    async (props, thunkAPI) => {
        const {isClientPage, clientId} = props
        const {rejectWithValue, dispatch, getState} = thunkAPI
        const newOrder = getNewOrderData(getState())
        const authData = getUserAuthData(getState())
        const clientData = getClientDetailsData(getState())
        const lastOrder = getProfileLastOrderNumber(getState())
        if (!authData || !newOrder) {
            return rejectWithValue(i18n.t('no data'))
        }
        const updatedOrder = {
            ...newOrder,
            status: '6467834500aba6813881d4',
            orderNumber: lastOrder,
            clientId: clientData?._id
        }

        if (!isClientPage) {
            updatedOrder.clientId = clientId
        }
        try {
            const {data} = await httpService.post<Order>('/orders/', {
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