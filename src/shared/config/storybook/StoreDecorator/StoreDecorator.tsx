/* eslint-disable react/display-name */
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { clientDetailsReducer } from 'entities/Clients/model/slice/clientDetailsSlice'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { profileReducer } from 'entities/Profile'
import { userReducer } from 'entities/User'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
    user: userReducer,
    profile: profileReducer,
    clientDetails: clientDetailsReducer
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
        },
        form: {
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
const clientDetails: DeepPartial<StateSchema> = {
    clientDetails: {
        isLoading: false,
        data: {
            id:'643c5fe7013e22868a6eb63c',
            avatarUrls: 'https://amur.info/wp-content/uploads/2023/07/3-16-768x518.jpg',
            name: 'Джонни Депп',
            profession: 'актер',
            email: 'name@mydomain.com',
            phone: '89001234567',
            notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
        },
        form: {
            id:'643c5fe7013e22868a6eb63c',
            avatarUrls: 'https://amur.info/wp-content/uploads/2023/07/3-16-768x518.jpg',
            name: 'Джонни Депп',
            profession: 'актер',
            email: 'name@mydomain.com',
            phone: '89001234567',
            notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
        }
    }
}
const clientDetailsError: DeepPartial<StateSchema> = {
    clientDetails: {
        isLoading: false,
        error: 'error'
    }
}
const clientDetailsisLoading: DeepPartial<StateSchema> = {
    clientDetails: {
        isLoading: true
    }
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

export const clientDetailsStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={clientDetails} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const clientDetailsErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={clientDetailsError} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const clientDetailsIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={clientDetailsisLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)