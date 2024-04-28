import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice'
import { stateAllErrors, stateAllIn, stateAllIsLoading } from './state'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
}

export const LoginFormStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIn} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)

export const LoginFormStoreDecoratorLoading: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)

export const LoginFormStoreDecoratorWithError: Decorator = (Story) => (
    <StoreProvider initialState={stateAllErrors} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
