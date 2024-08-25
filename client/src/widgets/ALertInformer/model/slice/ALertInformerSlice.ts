import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ALertDetails, ALertInformerSchema } from '../types/ALertInformer'

const initialState: ALertInformerSchema = {
    messages: []
}

export const aLertInformerSlice = createSlice({
    name: 'aLertInformer',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ALertDetails>) => {
            state.messages.push(action.payload)
        },
        removeMessage: (state, action: PayloadAction<string>) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload)
        },
        clearAll: (state) => {
            state.messages = []
        }
    }
})

export const {actions: aLertInformerAction} = aLertInformerSlice
export const {reducer: aLertInformerReducer} =aLertInformerSlice