import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { orderStatusEditReducer } from 'widgets/OrderStatusEdit'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    OrderStatusEditSchema: orderStatusEditReducer,
    
}

export const orderStatusesEdit: DeepPartial<StateSchema> = {
    OrderStatusEditSchema: {
        isLoading: false,
        editStatusId: '64492fd3d206f2a8b5f4298e',
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
export const orderStatusesEditError: DeepPartial<StateSchema> = {
    OrderStatusEditSchema: {
        isLoading: false,
        error: 'error'
    }
}
export const orderStatusesEditIsLoading: DeepPartial<StateSchema> = {
    OrderStatusEditSchema: {
        isLoading: true
    }
}

export const orderStatusesEditStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={orderStatusesEdit} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderStatusesEditIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={orderStatusesEditIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)

export const orderStatusesEditErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={orderStatusesEditError} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
