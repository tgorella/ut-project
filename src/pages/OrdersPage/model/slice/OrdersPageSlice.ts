import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { OrdersPageSchema } from '../types/OrdersPageSchema'
import { fetchAllOrders } from '../services/fetchAllOrders/fetchAllOrders'
import { Order } from 'entities/Order'

const initialState: OrdersPageSchema = {
    isLoading: false,
    data: undefined,
    error: undefined
}

export const ordersPageSlice = createSlice({
    name: 'ordersPage',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload

            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
    }
})

export const {actions: ordersPageAction} = ordersPageSlice
export const {reducer: ordersPageReducer} = ordersPageSlice