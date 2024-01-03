/* eslint-disable react/display-name */
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { userReducer } from 'entities/User'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    user: userReducer,
}

const stateUser: DeepPartial<StateSchema> = {
    user: {authData: {id: '1', username: 'user'}},
} 

const logoutStateUser: DeepPartial<StateSchema> = {
    user: {authData: {id: '', username: ''}},
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