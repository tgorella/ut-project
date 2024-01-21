import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Event, EventSchema } from '../types/Event'
import { getEventById } from '../services/getEventbyId/getEventById'
import { updateEventData } from '../services/updateEventData/updateEventData'


const initialState: EventSchema = {
    isLoading: false,
    error: undefined,
    formData: undefined,
    eventDetails: undefined
}

const eventInitialState: Event = {
    _id: '',
    title: '',
    userId: '',
    eventType: '',
    startTime: '',
    endTime: '',
    place: '',
    notes: '',
    eventDate: ''
}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        updateEvent: (state, action) => {
            state.formData = {
                ...state.formData,
                ...action.payload
            }
        },
        chancelEdit: (state) => {
            state.formData = state.eventDetails
        },
        newEvent: (state) => {
            state.formData = eventInitialState
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getEventById.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(getEventById.fulfilled, (state, action: PayloadAction<Event>) => {
                state.isLoading = false
                state.error = undefined
                state.eventDetails = action.payload
                state.formData = action.payload

            })
            .addCase(getEventById.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(updateEventData.fulfilled, (state, action) => {
                state.eventDetails = action.payload
            })
    }
})

export const {actions: eventAction} = eventSlice
export const {reducer: eventReducer} =eventSlice