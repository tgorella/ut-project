import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { clientDetailsReducer } from 'entities/Clients'
import { orderDetailsReducer } from 'entities/Order'
import { orderStatusReducer } from 'entities/OrderStatus'
import { stateAllErrors, stateAllIn, stateAllIsLoading } from './state'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    orderDetails: orderDetailsReducer,
    orderStatuses: orderStatusReducer,
    clientDetails: clientDetailsReducer
}

export const orderDetailsStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIn} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderDetailsErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllErrors} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderDetailsIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
