import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PaymentMethod, PaymentMethodsSchema } from '../model/types/PaymentMethod'
import { fetchPaymentMethods } from '../model/services/fetchPaymentMethods/fetchPaymentMethods'
import { updatePaymentMethod } from '../model/services/updatePaymentMethod/updatePaymentMethod'
import { deletePaymentMethod } from '../model/services/deletePaymentMethod/deletePaymentMethod'
import { addPaymentMethod } from '../model/services/addPaymentMethod/addPaymentMethod'

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
            .addCase(deletePaymentMethod.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.data = state.data?.filter(item => item._id !== action.payload)
            })
            .addCase(updatePaymentMethod.fulfilled, (state, action: PayloadAction<PaymentMethod>) => {
                state.isLoading = false
                state.data = state.data?.map(item => item._id === action.payload._id ? action.payload : item)
            })
            .addCase(addPaymentMethod.fulfilled, (state, action: PayloadAction<PaymentMethod>) => {
                state.data?.push(action.payload)
            })
    }
})

export const {actions: paymentMethodAction} = paymentMethodSlice
export const {reducer: paymentMethodReducer} = paymentMethodSlice