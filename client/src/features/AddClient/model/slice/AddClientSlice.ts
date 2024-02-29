import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddClientSchema } from '../types/AddClientSchema'
import { Client } from 'entities/Clients'

const initialState: AddClientSchema = {
    data: {
        name: '',
        email: '',
        notes: '',
        phone: '',
        avatarUrls: '',
        profession: '',
        userId: '',
        telegram: '',
        instagram: '',
        address: '',
        isFav: false
    }
    
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
            state.data = initialState.data
        }
    }
})

export const {actions: addClientAction} = addClientSlice
export const {reducer: addClientReducer} = addClientSlice