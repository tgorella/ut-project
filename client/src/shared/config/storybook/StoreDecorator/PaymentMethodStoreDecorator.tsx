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
                icon_url: 'https://gte-image-thing.storage.yandexcloud.net/banks/a23622d7-a715-4728-9d9c-ffc7fe32d1f9.png'
            },
            {
                _id: '2',
                name: 'Сбербанк',
                icon_url: 'https://gte-image-thing.storage.yandexcloud.net/banks/bd2d928c-36a5-4bd0-95d3-0f793e1323c4.png'
            },
            {
                _id: '3',
                name: 'Т Банк',
                icon_url: 'https://gte-image-thing.storage.yandexcloud.net/banks/554af621-7a47-4601-a128-b0bc041e99c4.png'
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