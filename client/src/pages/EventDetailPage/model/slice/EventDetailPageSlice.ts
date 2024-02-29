import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EventExtended, getEventById, updateEventData } from 'entities/Event'
import { EventDetailPageSchema } from '../types/EventDetailPage'
import { fetchEventTypes } from 'entities/EventType'

const initialState: EventDetailPageSchema = {
    isLoading: false,
    error: undefined
}

const eventInitialState: EventExtended = {
    _id: '',
    title: '',
    userId: '',
    eventType: {
        _id: '',
        color: '',
        name: '',
        isDefault: false
    },
    startTime: '',
    endTime: '',
    place: '',
    notes: '',
    eventDate: ''
}

export const editEventSlice = createSlice({
    name: 'event/edit',
    initialState,
    reducers: {
        changeEvent: (state, action) => {
            state.form = {
                ...state.form,
                ...action.payload
            }
        },
        chancelEdit: (state) => {
            state.form = state.data
        },
        newEvent: (state) => {
            state.data = eventInitialState
            state.form = eventInitialState
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getEventById.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(getEventById.fulfilled, (state, action: PayloadAction<EventExtended>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
                state.form = action.payload

            })
            .addCase(getEventById.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(updateEventData.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(fetchEventTypes.fulfilled, (state, action) => {
                state.eventTypes = action.payload
            })
    }
})

export const {actions: eventDetailAction} = editEventSlice
export const {reducer: eventDetailReducer} = editEventSlice