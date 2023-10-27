/* eslint-disable react/display-name */
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { profileReducer } from 'entities/Profile'
import { userReducer } from 'entities/User'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { Country, Currency } from 'shared/const/common'

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
    user: userReducer,
    profile: profileReducer
}

const profileState: DeepPartial<StateSchema> = {
    profile: {
        readonly: true,
        isLoading: false,
        error: undefined,
        data: {
            firstname:'Tatiana',
            lastname:'Gorelova',
            age:38,
            currency:Currency.RUB,
            country:Country.Russia,
            city:'Zvenigorod',
            username:'tratata',
            avatar:'https://avatars.githubusercontent.com/u/107557323?v=4'
        }
    }
}
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
    <StoreProvider initialState={stateUser} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)

export const LogoutUserStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={logoutStateUser} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)

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

export const ProfileStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={profileState} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)