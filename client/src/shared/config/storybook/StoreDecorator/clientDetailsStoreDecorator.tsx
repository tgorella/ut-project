import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { clientDetailsReducer } from '@/entities/Clients'
import { stateAllErrors, stateAllIn, stateAllIsLoading } from './state'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    clientDetails: clientDetailsReducer
}

export const clientDetailsStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIn} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const clientDetailsErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllErrors} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const clientDetailsIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
