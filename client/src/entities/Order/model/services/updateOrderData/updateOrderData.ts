import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { OrderExtended } from '../../types/OrderSchema'
import { getOrderDetailsForm } from '../../selectors/getOrderDetailsForm/getOrderDetailsForm'


export const updateOrderData = createAsyncThunk<OrderExtended, string,ThunkConfig<string>>(
    'orderDetails/updateOrderData',
    async (id, thunkAPI) => {
        const {rejectWithValue,getState, extra} = thunkAPI
        const formData = getOrderDetailsForm(getState())
        try {

            const newData = {
                ...formData,
                status: formData?.status?._id || '659bc05bec9c6a620f683037',
                projectType: formData?.projectType?._id || '',
                _id: id
            }

            delete newData.clientId
            delete newData.createdAt
            delete newData.orderNumber

            const {data} = await extra.api.post('/', {
                'query': 'mutation UpdateOrder($data: OrderNewDataInput) { updateOrder(data: $data) { clientId {_id address avatarUrls email isFav name notes phone profession } createdAt endTime eventDate notes orderNumber place projectType { _id name } startTime status { _id color name } title total } }',
                'operation-name':'UpdateOrder',
                'variables': {'data': newData}
            })

            if (!data) {
                throw new Error('err')
            }
            return data.data.updateOrder
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)