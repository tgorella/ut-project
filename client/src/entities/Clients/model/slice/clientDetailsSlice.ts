import { ClientDetailsSchema } from './../types/clientDetailsSchema'
import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getClientById } from '../services/getClientById/getClientById'
import { Client } from '../types/clientSchema'
import { updateClientData } from '../services/updateClientData/updateClientData'
import { getClientOrders } from '../services/getClientOrders/getClientOrders'
import { Order } from 'entities/Order'

const initialState: ClientDetailsSchema = {
    isLoading: true,
    data: undefined,
    form: undefined,
    error: undefined,
    orders: [],
    ordersLoading: false
}

const formInitialState: Client = {
    name: '',
    email: '',
    notes: '',
    phone: '',
    avatarUrls: '',
    profession: '',
    userId: '',
    telegram: '',
    instagram: '',
    address: ''
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
        },
        newClient: (state) => {
            state.form = formInitialState
        },
        orderAdded: (state, action) => {
            state.orders?.push(action.payload)
        },
        orderDeleted: (state, action) => {
            state.orders = state.orders?.filter((order) => order._id !== action.payload)
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
            .addCase(getClientOrders.pending, (state) => {
                state.orders = []
                state.ordersLoading = true
            })
            .addCase(getClientOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.orders = action.payload
                state.ordersLoading = false
            })
            .addCase(getClientOrders.rejected, (state, action) => {
                state.orders = []
                state.error = action.payload
                state.ordersLoading = false
            })
    }
})

export const {actions: clientDetailsAction} = clientDetailsSlice
export const {reducer: clientDetailsReducer} = clientDetailsSlice