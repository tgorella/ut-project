import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { clientDetailsReducer } from 'entities/Clients'
import { orderDetailsReducer } from 'entities/Order'
import { orderStatusReducer } from 'entities/OrderStatus'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    orderDetails: orderDetailsReducer,
    orderStatuses: orderStatusReducer,
    clientDetails: clientDetailsReducer
}

export const orderDetails: DeepPartial<StateSchema> = {
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
    },
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
    },
    orderDetails: {
        isLoading: false,
        data: {
            _id: '64469ad32e53c6aa4c0746b6',
            clientId: '643c5fe7013e22868a6eb63c',
            total: '35000',
            notes: '',
            eventDate: '2023-12-12',
            eventType: 'crm-work',
            orderNumber: '31',
            place: 'Лондон',
            status: '643e58efaba80539138865d2',
            startTime: '10',
            endTime: '17',
            title: 'Первый заказ Джонни',
            userId: '643c36ad8545463c883af7a8',
            projectType: '6469da05312bc36f4e9ecedc'
        },
        form: {
            _id: '64469ad32e53c6aa4c0746b6',
            clientId: '643c5fe7013e22868a6eb63c',
            total: '35000',
            notes: '',
            eventDate: '2023-12-12',
            eventType: 'crm-work',
            orderNumber: '31',
            place: 'Лондон',
            status: '643e58efaba80539138865d2',
            startTime: '10',
            endTime: '17',
            title: 'Первый заказ Дориана',
            userId: '643c36ad8545463c883af7a8',
            projectType: '6469da05312bc36f4e9ecedc'
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
