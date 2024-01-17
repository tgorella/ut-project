import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { eventTypesEditReducer } from 'widgets/EventTypesEdit'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    eventTypesEditSchema: eventTypesEditReducer,
    
}

export const eventTypesEdit: DeepPartial<StateSchema> = {
    eventTypesEditSchema: {
        isLoading: false,
        editTypeId: '64492fd3d206f2a8b5f4298e',
        data: [{
            _id: '643e58deaba80539138865d0',
            name: 'Учеьба',
            color: '#bde2a8',
            isDefault: false
        },
        {
            _id: '643e58efaba80539138865d2',
            name: 'Личное',
            color: '#ff759f',
            isDefault: false
        },
        {
            _id: '643e5900aba80539138865d4',
            name: 'Семья',
            color: 'gray',
            isDefault: false
        },
        {
            _id: '6467834500aba6813881d4',
            name: 'Друзья',
            color: 'blue',
            isDefault: false
        }
        ]
    }
}
export const eventTypesEditError: DeepPartial<StateSchema> = {
    eventTypesEditSchema: {
        isLoading: false,
        error: 'error'
    }
}
export const eventTypesEditIsLoading: DeepPartial<StateSchema> = {
    eventTypesEditSchema: {
        isLoading: true
    }
}

export const eventTypesEditStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={eventTypesEdit} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const eventTypesEditIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={eventTypesEditIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)

export const eventTypesEditErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={eventTypesEditError} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
