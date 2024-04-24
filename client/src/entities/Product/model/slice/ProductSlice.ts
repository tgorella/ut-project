import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProductSchema } from '../types/ProductSchema'

const initialState: ProductSchema = {
    
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
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

export const {actions: productAction} = productSlice
export const {reducer: productReducer} =productSlice