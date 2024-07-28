import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { stateAllIn, stateAllErrors, stateAllIsLoading } from './state'
import { paymentMethodReducer } from '@/entities/PaymentMethod/slice/PaymentMethodsSlice'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    paymentMethods: paymentMethodReducer
}

export const paymentMethodsStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIn} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const paymentMethodsErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllErrors} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const paymentMethodsIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)