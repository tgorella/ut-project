import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CalendarPageSchema } from '../types/CalendarPage'
import { Event, deleteEvent, fetchEvents } from 'entities/Event'


const initialState: CalendarPageSchema = {
    isLoading: false,
    events: [],
    error: undefined
}

export const calendarPageSlice = createSlice({
    name: 'calendarPage',
    initialState,
    reducers: {
        eventAdded: (state, action) => {
            state.events?.push(action.payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
                state.isLoading = false
                state.error = undefined
                state.events = action.payload

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