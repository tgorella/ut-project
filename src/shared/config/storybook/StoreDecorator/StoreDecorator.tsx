/* eslint-disable react/display-name */
import { DeepPartial } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'

const stateUser: DeepPartial<StateSchema> = {
    user: {authData: {id: '1', username: 'user'}},
} 

const logoutStateUser: DeepPartial<StateSchema> = {
    user: {authData: {id: '', username: ''}},
} 

const stateLoginForm: DeepPartial<StateSchema> = {
    loginForm: {username: 'user', password:'pass123', isLoading: false}
} 

const stateLoginFormLoading: DeepPartial<StateSchema> = {
    loginForm: {username: 'user', password:'pass123', isLoading: true}
} 
const stateLoginFormError: DeepPartial<StateSchema> = {
    loginForm: {username: 'user', password:'pass123', isLoading: false, error: 'error'}
} 
export const UserStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateUser}>
        {Story()}
    </StoreProvider>
)

export const LogoutUserStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={logoutStateUser}>
        {Story()}
    </StoreProvider>
)

export const LoginFormStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateLoginForm}>
        {Story()}
    </StoreProvider>
)

export const LoginFormStoreDecoratorLoading: Decorator = (Story) => (
    <StoreProvider initialState={stateLoginFormLoading}>
        {Story()}
    </StoreProvider>
)

export const LoginFormStoreDecoratorWithError: Decorator = (Story) => (
    <StoreProvider initialState={stateLoginFormError}>
        {Story()}
    </StoreProvider>
)