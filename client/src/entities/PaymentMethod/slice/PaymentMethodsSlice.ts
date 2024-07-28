import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PaymentMethod, PaymentMethodsSchema } from '../model/types/PaymentMethod'
import { fetchPaymentMethods } from '../model/services/fetchPaymentMethods/fetchPaymentMethods'

const initialState: PaymentMethodsSchema = {
    isLoading: false,
    data: undefined
}

export const paymentMethodSlice = createSlice({
    name: 'paymentMethods',
    initialState,
    reducers: {
      
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPaymentMethods.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchPaymentMethods.fulfilled, (state, action: PayloadAction<PaymentMethod[]>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload

            })
            .addCase(fetchPaymentMethods.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
    }
})

export const {actions: paymentMethodAction} = paymentMethodSlice
export const {reducer: paymentMethodReducer} =paymentMethodSlice