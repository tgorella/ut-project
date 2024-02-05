import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { calendarPageReducer } from 'pages/CalendarPage'
import { stateAllErrors, stateAllIn, stateAllIsLoading } from './state'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    CalendarPage: calendarPageReducer,
}

export const CalendarStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIn} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const calendarPageIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllErrors} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)

export const calendarPageErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
