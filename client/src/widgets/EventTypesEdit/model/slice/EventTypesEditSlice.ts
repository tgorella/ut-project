import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EventTypesEditSchema } from '../types/EventTypesEdit'
import { EventType, addEventType, deleteEventType, fetchEventTypes, updateEventType } from 'entities/EventType'

const initialState: EventTypesEditSchema = {
    isLoading: false,
    data: [],
    editTypeId: '',
    newData: undefined
}

export const eventTypesEditSlice = createSlice({
    name: 'eventTypesEdit',
    initialState,
    reducers: {
        updateEditEventId: (state, action) => {
            state.editTypeId = action.payload
        },
        clearEventId: (state) => {
            state.editTypeId = ''
        },
        updateEventData: (state, action) => {
            state.newData = {
                ...state.newData,
                ...action.payload
            }
        },
        clearEventData: (state) => {
            state.newData = undefined
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEventTypes.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchEventTypes.fulfilled, (state, action: PayloadAction<EventType[]>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
                
            })
            .addCase(fetchEventTypes.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(updateEventType.fulfilled, (state,action: PayloadAction<EventType>) => {
                state.data.forEach((el) => {
                    if (el._id === action.payload._id) {
                        el.name = action.payload.name
                        el.color = action.payload.color
                    }
                })
            })
            .addCase(addEventType.fulfilled, (state, action: PayloadAction<EventType>) => {
                state.data.push(action.payload)
            })
            .addCase(deleteEventType.fulfilled, (state, action: PayloadAction<string>) => {
                state.data = state.data.filter((el) => el._id !== action.payload)
            })
    }
})

export const {actions: eventTypesEditAction} = eventTypesEditSlice
export const {reducer: eventTypesEditReducer} =eventTypesEditSlice