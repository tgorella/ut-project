import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { OrderStatusEditSchema } from '../types/OrderStatusEdit'
import { OrderStatusDetails, addOrderStatus, deleteStatus, fetchOrderStatuses, updateStatus } from 'entities/OrderStatus'

const initialState: OrderStatusEditSchema = {
    isLoading: false,
    data: [],
    editStatusId: '',
    newData: undefined
}

 
export const orderStatusEditSlice = createSlice({
    name: 'orderStatusEdit',
    initialState,
    reducers: {
        updateStatusId: (state, action) => {
            state.editStatusId = action.payload
        },
        clearStatusId: (state) => {
            state.editStatusId = ''
        },
        updateStatusData: (state, action) => {
            state.newData = {
                ...state.newData,
                ...action.payload
            }
        },
        clearStatusData: (state) => {
            state.newData =  undefined
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOrderStatuses.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchOrderStatuses.fulfilled, (state, action: PayloadAction<OrderStatusDetails[]>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload

            })
            .addCase(fetchOrderStatuses.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.data.forEach((el) => {
                    if (el._id === action.payload._id) {
                        el.name = action.payload.name
                        el.color = action.payload.color
                    }
                })
            })
            .addCase(addOrderStatus.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(deleteStatus.fulfilled, (state, action) => {
                state.data = state.data.filter((el) => el._id !== action.payload)
            })
    }
})

export const {actions: orderStatusEditAction} = orderStatusEditSlice
export const {reducer: orderStatusEditReducer} = orderStatusEditSlice