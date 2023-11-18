import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { orderDetailsReducer } from 'entities/Order'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    orderDetails: orderDetailsReducer
}

export const orderDetails: DeepPartial<StateSchema> = {
    orderDetails: {
        isLoading: false,
        data: {
            id: '64469ad32e53c6aa4c0746b6',
            clientId: '643c5fe7013e22868a6eb63c',
            total: '35000',
            notes: '',
            eventDate: '2023-12-12',
            eventType: 'crm-work',
            orderNumber: '31',
            place: 'Лондон',
            status: 'in-progress',
            startTime: '10',
            endTime: '17',
            title: 'Первый заказ Дориана',
            userId: '643c36ad8545463c883af7a8',
            createdAt: 1682348755138,
            updatedAt: 1684658867525,
            projectType: '6469da05312bc36f4e9ecedc',
            steps: [
                'done',
                'done',
                'none',
                'none',
                'none',
                'none',
                'none',
                'none',
                'none',
                'none'
            ]
        },
        form: {
            id: '64469ad32e53c6aa4c0746b6',
            clientId: '643c5fe7013e22868a6eb63c',
            total: '35000',
            notes: '',
            eventDate: '2023-12-12',
            eventType: 'crm-work',
            orderNumber: '31',
            place: 'Лондон',
            status: 'in-progress',
            startTime: '10',
            endTime: '17',
            title: 'Первый заказ Дориана',
            userId: '643c36ad8545463c883af7a8',
            createdAt: 1682348755138,
            updatedAt: 1684658867525,
            projectType: '6469da05312bc36f4e9ecedc',
            steps: [
                'done',
                'done',
                'none',
                'none',
                'none',
                'none',
                'none',
                'none',
                'none',
                'none'
            ]
        }
    }
}
export const orderDetailsError: DeepPartial<StateSchema> = {
    orderDetails: {
        isLoading: false,
        error: 'error'
    }
}
export const orderDetailsisLoading: DeepPartial<StateSchema> = {
    orderDetails: {
        isLoading: true
    }
}

export const orderDetailsStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={orderDetails} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderDetailsErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={orderDetailsError} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderDetailsIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={orderDetailsisLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
