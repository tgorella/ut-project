import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { OrderDetailsSchema } from '../types/OrderDetailsSchema'
import { OrderExtended } from '../types/OrderSchema'
import { getOrderById } from '../services/getOrderById/getOrderById'
import { updateOrderData } from '../services/updateOrderData/updateOrderData'


const initialState: OrderDetailsSchema = {
    isLoading: true,
    data: undefined,
    form: undefined,
    error: undefined
}

const formInitialState: OrderExtended = {
    _id: '',
    clientId: {
        _id: '',

    },
    total: '',
    notes: '',
    eventDate: '',
    eventType: '',
    orderNumber: '',
    place: '',
    status: {
        _id:'',
        name: '',
        color: ''},
    startTime: '',
    endTime: '',
    title: '',
    userId: '',
    projectType: {
        _id:'',
        name: '',
        userId: '',
        stages: []}
}
export const OrderDetailsSlice = createSlice({
    name: 'OrderDetails',
    initialState,
    reducers: {
        updateOrder: (state, action) => {
            state.form = {
                ...state.form,
                ...action.payload
            }
        },
        chancelEdit: (state) => {
            state.form = state.data
        },
        newOrder: (state) => {
            state.form = formInitialState
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getOrderById.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(getOrderById.fulfilled, (state, action: PayloadAction<OrderExtended>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
                state.form = action.payload
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(updateOrderData.pending, (state) => {
                state.error = undefined
            })
            .addCase(updateOrderData.fulfilled, (state, action: PayloadAction<OrderExtended>) => {
                state.data = action.payload
                state.form = action.payload

            })
            .addCase(updateOrderData.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const {actions: orderDetailsAction} = OrderDetailsSlice
export const {reducer: orderDetailsReducer} = OrderDetailsSlice
