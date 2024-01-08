import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
}

export const stateLoginForm: DeepPartial<StateSchema> = {
    loginForm: {email: 'user@mail.ru', password:'pass123', isLoading: false}
} 

export const stateLoginFormLoading: DeepPartial<StateSchema> = {
    loginForm: {email: 'user@mail.ru', password:'pass123', isLoading: true}
} 
export const stateLoginFormError: DeepPartial<StateSchema> = {
    loginForm: {email: 'user@mail.ru', password:'pass123', isLoading: false, error: 'error'}
}

export const LoginFormStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateLoginForm} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)

export const LoginFormStoreDecoratorLoading: Decorator = (Story) => (
    <StoreProvider initialState={stateLoginFormLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)

export const LoginFormStoreDecoratorWithError: Decorator = (Story) => (
    <StoreProvider initialState={stateLoginFormError} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
