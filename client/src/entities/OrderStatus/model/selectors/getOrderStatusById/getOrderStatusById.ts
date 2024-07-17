import { StateSchema } from '@/app/providers/StoreProvider'
import { OrderStatusDetails } from '../../types/OrderStatus'

export const getOrderStatusById = (id: string) => (state: StateSchema) => {

    const initialState: OrderStatusDetails = {
        _id:'6467834500aba6813881d4',
        name:'Новый',
        color:'',
        isDefault:true
    }
    
    if (state.orderStatuses?.data) {
        return state.orderStatuses?.data.find((item) => item._id === id) || initialState
    }
}