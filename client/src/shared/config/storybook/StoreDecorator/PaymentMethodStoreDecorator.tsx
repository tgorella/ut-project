import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { paymentMethodReducer } from '@/entities/PaymentMethod/slice/PaymentMethodsSlice'

const state:Partial<StateSchema> = {
    paymentMethods: {
        isLoading: false,
        data: [
            {
                _id: '1',
                name: 'Альфа Банк',
                icon_url: 'https://storage.yandexcloud.net/gte-image-thing/banks/alfabank.svg'
            },
            {
                _id: '2',
                name: 'Сбербанк',
                icon_url: 'https://storage.yandexcloud.net/gte-image-thing/banks/sberbank.svg'
            },
            {
                _id: '3',
                name: 'Т Банк',
                icon_url: 'https://storage.yandexcloud.net/gte-image-thing/banks/t-bank.svg'
            },
            {
                _id: '4',
                name: 'ВТБ',
                icon_url: 'https://storage.yandexcloud.net/gte-image-thing/banks/vtbbank.svg'
            },
            {
                _id: '5',
                name: 'Наличные',
                icon_url: ''
            }
        
        ]
    }
}

const stateIsLoading: Partial<StateSchema> = {
    paymentMethods: {
        isLoading: true
    }
}

const stateError: Partial<StateSchema> = {
    paymentMethods: {
        isLoading: false,
        error: 'error'
    }
}
export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    paymentMethods: paymentMethodReducer
}

export const paymentMethodsStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={state} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const paymentMethodsErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateError} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const paymentMethodsIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)