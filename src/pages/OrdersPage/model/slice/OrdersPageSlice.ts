import {createSlice } from '@reduxjs/toolkit'
import { OrdersPageSchema } from '../types/OrdersPageSchema'

const initialState: OrdersPageSchema = {
    
}

export const ordersPageSlice = createSlice({
    name: 'ordersPage',
    initialState,
    reducers: {},
    extraReducers() {
        // builder
        //     .addCase(fetchProfileData.pending, (state) => {
        //         state.error = undefined
        //         state.isLoading = true
        //     })
        //     .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        //         state.isLoading = false
        //         state.error = undefined
        //         state.data = action.payload
        //         state.form = action.payload

        //     })
        //     .addCase(fetchProfileData.rejected, (state, action) => {
        //         state.isLoading= false
        //         state.error = action.payload
        //     })
    }
})

export const {actions: ordersPageAction} = ordersPageSlice
export const {reducer: ordersPageReducer} =ordersPageSlice