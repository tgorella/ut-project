import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddOrderSchema } from '../types/addOrderSchema'
import { OrderExtended } from 'entities/Order'
import { fetchProjects } from 'entities/Project'

const initialState: AddOrderSchema = {
    data: {
        clientId: {},
        total: '',
        notes: '',
        eventDate: '',
        eventType: 'work',
        orderNumber: '',
        place: '',
        status: {
            _id: '',
            name: '',
            color: ''
        },
        startTime: '',
        endTime: '',
        title: '',
        userId: '',
        projectType: {
            _id: '',
            name: '',
            userId: '',
            stages: []
        }
    },
    projects: []
    
}

export const addOrderSlice = createSlice({
    name: 'addOrder',
    initialState,
    reducers: {
        updateNewOrderData: (state, action: PayloadAction<Partial<OrderExtended>>) => {
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