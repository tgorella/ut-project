import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { orderStatusReducer } from 'entities/OrderStatus'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    orderStatuses: orderStatusReducer,
    
}

export const orderStatuses: DeepPartial<StateSchema> = {
    orderStatuses: {
        isLoading: false,
        data: [{
            _id: '643e58deaba80539138865d0',
            name: 'Завершен',
            color: '#bde2a8',
            isDefault: true
        },
        {
            _id: '643e58efaba80539138865d2',
            name: 'Отменен',
            color: '#ff759f',
            isDefault: true
        },
        {
            _id: '643e5900aba80539138865d4',
            name: 'Архив',
            color: 'gray',
            isDefault: true
        },
        {
            _id: '6467834500aba6813881d4',
            name: 'Новый',
            color: 'blue',
            isDefault: true
        },
        {
            _id: '64492fd3d206f2a8b5f4298e',
            name: 'В процессе',
            color: '#d9cafe',
            userId: '643c36ad8545463c883af7a8',
            isDefault: false
        }
        ]
    }
}
export const orderStatusError: DeepPartial<StateSchema> = {
    orderStatuses: {
        isLoading: false,
        error: 'error'
    }
}
export const orderStatusIsLoading: DeepPartial<StateSchema> = {
    orderStatuses: {
        isLoading: true
    }
}

export const orderStatusesStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={orderStatuses} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderStatusesErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={orderStatusError} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
