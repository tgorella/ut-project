import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddOrderSchema } from '../types/addOrderSchema'
import { Order } from 'entities/Order'

const initialState: AddOrderSchema = {
    data: {
        clientId: '',
        total: '',
        notes: '',
        eventDate: '',
        eventType: 'work',
        orderNumber: '',
        place: '',
        status: '',
        startTime: '',
        endTime: '',
        title: '',
        userId: '',
        projectType: ''
    }
    
}

export const addOrderSlice = createSlice({
    name: 'addOrder',
    initialState,
    reducers: {
        updateNewOrderData: (state, action: PayloadAction<Partial<Order>>) => {
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

export const {actions: addOrderAction} = addOrderSlice
export const {reducer: addOrderReducer} = addOrderSlice