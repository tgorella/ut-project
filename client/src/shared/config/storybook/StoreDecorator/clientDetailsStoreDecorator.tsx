import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { clientDetailsReducer } from 'entities/Clients'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    clientDetails: clientDetailsReducer
}

export const clientDetails: DeepPartial<StateSchema> = {
    clientDetails: {
        isLoading: false,
        data: {
            _id:'643c5fe7013e22868a6eb63c',
            avatarUrls: 'https://amur.info/wp-content/uploads/2023/07/3-16-768x518.jpg',
            name: 'Джонни Депп',
            profession: 'актер',
            email: 'name@mydomain.com',
            phone: '89001234567',
            notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
        },
        form: {
            _id:'643c5fe7013e22868a6eb63c',
            avatarUrls: 'https://amur.info/wp-content/uploads/2023/07/3-16-768x518.jpg',
            name: 'Джонни Депп',
            profession: 'актер',
            email: 'name@mydomain.com',
            phone: '89001234567',
            notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
        }
    }
}
export const clientDetailsError: DeepPartial<StateSchema> = {
    clientDetails: {
        isLoading: false,
        error: 'error'
    }
}
export const clientDetailsisLoading: DeepPartial<StateSchema> = {
    clientDetails: {
        isLoading: true
    }
}

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
