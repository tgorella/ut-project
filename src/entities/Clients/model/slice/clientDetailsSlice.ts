import { ClientDetailsSchema } from './../types/clientDetailsSchema'
import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getClientById } from '../services/getClientById/getClientById'
import { Client } from '../types/clientSchema'
import { updateClientData } from '../services/updateClientData/updateClientData'

const initialState: ClientDetailsSchema = {
    isLoading: true,
    data: undefined,
    form: undefined,
    error: undefined
}

export const clientDetailsSlice = createSlice({
    name: 'clientDetails',
    initialState,
    reducers: {
        updateClient: (state, action: PayloadAction<Client>) => {
            state.form = {
                ...state.form,
                ...action.payload
            }
        },
        chancelEdit: (state) => {
            state.form = state.data
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getClientById.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(getClientById.fulfilled, (state, action: PayloadAction<Client>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
                state.form = action.payload
            })
            .addCase(getClientById.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(updateClientData.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(updateClientData.fulfilled, (state, action: PayloadAction<Client>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
                state.form = action.payload

            })
            .addCase(updateClientData.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
    }
})

export const {actions: clientDetailsAction} = clientDetailsSlice
export const {reducer: clientDetailsReducer} = clientDetailsSlice