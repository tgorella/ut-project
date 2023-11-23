import {createSlice } from '@reduxjs/toolkit'
import { AddClientButtonSchema } from '../types/AddClientButtonSchema'
import { addClient } from '../services/AddClient/addClient'

const initialState: AddClientButtonSchema = {
    added: false
    
}

export const addClientButtonSlice = createSlice({
    name: 'addClientButton',
    initialState,
    reducers: {
        clientAdded: (state) => {
            state.added = true
        },
        reset: (state) => {
            state.added = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addClient.pending, (state) => {
                state.added = false
                state.error = undefined
            })
            .addCase(addClient.fulfilled, (state) => {
                state.added = true
            })
            .addCase(addClient.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const {actions: addClientButtonAction} = addClientButtonSlice
export const {reducer: addClientButtonReducer} = addClientButtonSlice