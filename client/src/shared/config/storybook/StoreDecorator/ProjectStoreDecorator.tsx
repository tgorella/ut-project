import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { projectsPageReducer } from 'pages/ProjectsPage'
import { projectEditReducer } from 'widgets/ProjectEdit'
import { stateAllErrors, stateAllIn, stateAllIsLoading } from './state'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    ProjectEdit: projectEditReducer,
    ProjectSelect: projectEditReducer,
    projectPage: projectsPageReducer
}

export const EditProjectStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIn} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderStatusesErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllErrors} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderStatusesIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
