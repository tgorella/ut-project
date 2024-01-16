import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { OrderStatusesSchema, OrderStatusDetails } from '../types/OrderStatus'
import { fetchOrderStatuses } from '../services/fetchOrderStatuses/fetchOrderStatuses'

const initialState: OrderStatusesSchema = {
    isLoading: false,
    data: undefined
}

export const orderStatusesSlice = createSlice({
    name: 'orderStatus',
    initialState,
    reducers: {
      
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOrderStatuses.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchOrderStatuses.fulfilled, (state, action: PayloadAction<OrderStatusDetails[]>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload

            })
            .addCase(fetchOrderStatuses.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
    }
})

export const {actions: orderStatusAction} = orderStatusesSlice
export const {reducer: orderStatusReducer} =orderStatusesSlice