import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { OrdersPageSchema } from '../types/OrdersPageSchema'
import { fetchAllOrders } from '../services/fetchAllOrders/fetchAllOrders'
import { Order } from 'entities/Order'

const initialState: OrdersPageSchema = {
    isLoading: false,
    data: undefined,
    error: undefined,
    limit: 25,
    search: ''
    
}

export const ordersPageSlice = createSlice({
    name: 'ordersPage',
    initialState,
    reducers: {
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload
            localStorage.setItem('orders_limit', action.payload.toString())
        },
        initState: (state) => {
            state.limit = Number(localStorage.getItem('orders_limit')) || 25
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        orderDeleted: (state, action) => {
            state.data = state.data?.filter((item) => item._id !== action.payload)
        },
        orderAdded: (state, action) => {
            state.data?.push(action.payload)
        }
    },
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