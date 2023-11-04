import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Client, ClientsSchema } from '../types/clientsSchema'
import { fetchClients } from '../services/fetchAll/fetchClients'

const initialState: ClientsSchema = {
    isLoading: false,
    data: undefined,
    error: ''
}

export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
      
    },
    extraReducers(builder) {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchClients.fulfilled, (state, action: PayloadAction<Client[]>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload

            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            
    }
})

export const {actions: clientsAction} = clientsSlice
export const {reducer: clientsReducer} = clientsSlice