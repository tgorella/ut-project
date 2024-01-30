import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CalendarPageSchema } from '../types/CalendarPage'
import { Event, deleteEvent, fetchEvents } from 'entities/Event'
import { fetchAllOrders } from 'pages/OrdersPage/model/services/fetchAllOrders/fetchAllOrders'
import { Order } from 'entities/Order'

const initialState: CalendarPageSchema = {
    isLoading: false,
    events: undefined,
    orders: undefined,
    error: undefined
}

export const calendarPageSlice = createSlice({
    name: 'calendarPage',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
                state.isLoading = false
                state.error = undefined
                state.events = action.payload

            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.isLoading = false
                state.error = undefined
                state.orders = action.payload
            })
            .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.error = undefined
                state.events = state.events?.filter((el) => el._id !== action.payload)
            })
    }
})

export const {actions: calendarPageAction} = calendarPageSlice
export const {reducer: calendarPageReducer} = calendarPageSlice