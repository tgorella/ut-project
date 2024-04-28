import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { profileReducer } from '@/entities/Profile'
import { orderStatusEditReducer } from '@/widgets/OrderStatusEdit'
import { stateAllIn } from './state'
import { projectEditReducer } from '@/widgets/ProjectEdit'
import { eventTypesEditReducer } from '@/widgets/EventTypesEdit'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    profile: profileReducer,
    OrderStatusEditSchema: orderStatusEditReducer,
    ProjectEdit: projectEditReducer,
    eventTypesEditSchema: eventTypesEditReducer
}

export const EditPageStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={stateAllIn} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
