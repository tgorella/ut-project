import {createSlice } from '@reduxjs/toolkit'
import { AddOrderButtonSchema } from '../types/AddOrderButton'
import { addOrder } from '../services/addOrder/addOrder'

const initialState: AddOrderButtonSchema = {
    added: false,
    error: undefined
}

export const addOrderButtonSlice = createSlice({
    name: 'addOrderButton',
    initialState,
    reducers: {
        added: (state) => {
            state.added = true
        },
        reset: (state) => {
            state.added = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addOrder.pending, (state) => {
                state.error = undefined
                state.added = false
            })
            .addCase(addOrder.fulfilled, (state) => {
                state.added = true
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.added= false
                state.error = action.payload
            })
    }
})

export const {actions: addOrderButtonAction} = addOrderButtonSlice
export const {reducer: addOrderButtonReducer} = addOrderButtonSlice