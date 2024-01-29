import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddOrderSchema } from '../types/addOrderSchema'
import { Order } from 'entities/Order'
import { fetchProjects } from 'entities/Project'

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
    },
    projects: []
    
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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload
            })
    }
})

export const {actions: addOrderAction} = addOrderSlice
export const {reducer: addOrderReducer} = addOrderSlice