import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddClientSchema } from '../types/AddClientSchema'
import { Client } from 'entities/Clients'

const initialState: AddClientSchema = {
    data: {
        id: Date.now().toString(),
        name: '',
        email: '',
        notes: '',
        phone: '',
        avatarUrls: '',
        profession: '',
        createdAt: '',
        updatedAt: '',
        userId: '',
        telegram: '',
        instagram: '',
        address: '',
        isFav: false
    },
    error: undefined
    
}

export const addClientSlice = createSlice({
    name: 'addClient',
    initialState,
    reducers: {
        updateNewClientData: (state, action: PayloadAction<Client>) => {
            state.data = {
                ...state.data,
                ...action.payload
            }
        },
        resetState: (state) => {
            state.error = undefined
            state.data = initialState.data
        }
    }
})

export const {actions: addClientAction} = addClientSlice
export const {reducer: addClientReducer} = addClientSlice