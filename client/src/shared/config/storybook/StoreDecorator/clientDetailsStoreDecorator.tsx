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
            avatarUrls: 'https://i1.mybook.io/p/x480/bookset/98/a5/98a52659-fbd2-4082-aada-940b7eb8ddb4.png',
            name: 'Джонни Депп',
            profession: 'актер',
            email: 'name@mydomain.com',
            phone: '89001234567',
            notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
        },
        form: {
            _id:'643c5fe7013e22868a6eb63c',
            avatarUrls: 'https://i1.mybook.io/p/x480/bookset/98/a5/98a52659-fbd2-4082-aada-940b7eb8ddb4.png',
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
