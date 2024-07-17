import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { getUserAuthData } from '@/entities/User'
import { Order } from '@/entities/Order'
import { addOrderButtonAction } from '../../slice/AddOrderButtonSlice'
import { getProfileLastOrderNumber, profileAction, updateProfileData } from '@/entities/Profile'
import { getClientDetailsData } from '@/entities/Clients'
import { getNewOrderData } from '@/features/AddOrder/model/selectors/getNewOrderData/getNewOrderData'

interface addOrderProps {
 isClientPage: boolean,
 clientId?: string,
 resData?: string
}

export const addOrder = createAsyncThunk<Order, addOrderProps,ThunkConfig<string>>(
    'orderAddButton/addOrder',
    async (props, thunkAPI) => {
        const { isClientPage, clientId } = props
        const {rejectWithValue, dispatch, getState, extra} = thunkAPI
        const newOrder = getNewOrderData(getState())
        const authData = getUserAuthData(getState())
        const clientData = getClientDetailsData(getState())
        const lastOrder = getProfileLastOrderNumber(getState())
        if (!authData || !newOrder) {
            return rejectWithValue(i18n.t('no data'))
        }
        const updatedOrder = {
            ...newOrder,
            status: '659bc05bec9c6a620f683037',
            orderNumber: Number(lastOrder),
            clientId: clientData?._id,
            projectType: newOrder.projectType?._id,
            steps: []
        }

        if (!isClientPage) {
            updatedOrder.clientId = clientId
        }
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation AddOrder($data: OrderInput) { addOrder(data: $data) { _id total title status { _id color name } startTime projectType { _id name } place orderNumber eventDate endTime createdAt } }',
                'operation-name': 'AddOrder',
                'variables': {'data': updatedOrder}
            })

            if (!data.data.addOrder) {
                throw new Error('err')
            }
            dispatch(profileAction.increaseOrderNumber())
            dispatch(updateProfileData())

            setTimeout(() => {
                dispatch(addOrderButtonAction.reset())
            }, 3000)

            return data.data.addOrder

        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)