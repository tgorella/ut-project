import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { profileReducer } from 'entities/Profile'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    profile: profileReducer,
}

export const profileState: DeepPartial<StateSchema> = {
    profile: {
        readonly: true,
        isLoading: false,
        error: undefined,
        data: {
            firstname:'Tatiana',
            lastname:'Gorelova',
            age:38,
            currency:Currency.RUB,
            country:Country.Russia,
            city:'Zvenigorod',
            username:'tratata',
            avatar:'https://avatars.githubusercontent.com/u/107557323?v=4'
        },
        form: {
            firstname:'Tatiana',
            lastname:'Gorelova',
            age:38,
            currency:Currency.RUB,
            country:Country.Russia,
            city:'Zvenigorod',
            username:'tratata',
            avatar:'https://avatars.githubusercontent.com/u/107557323?v=4'
        }
    }
}


export const ProfileStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={profileState} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
