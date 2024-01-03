import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddOrderSchema } from '../types/addOrderSchema'
import { Order } from 'entities/Order'

const initialState: AddOrderSchema = {
    data: {
        id: Date.now().toString(),
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
        projectType: '',
        steps: [],
        createdAt: 0,
        updatedAt: 0
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