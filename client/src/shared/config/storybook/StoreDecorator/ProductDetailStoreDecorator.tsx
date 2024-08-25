import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { stateAllErrors, stateAllIn, stateAllIsLoading } from './state'
import { productDetailsReducer } from '@/entities/Product/model/slice/productDetailsSlice'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    productDetails: productDetailsReducer
}

export const productDetailsStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIn} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const productDetailsErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllErrors} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const productDetailsIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
