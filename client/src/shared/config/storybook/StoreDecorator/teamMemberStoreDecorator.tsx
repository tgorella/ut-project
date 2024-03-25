import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { profileReducer } from 'entities/Profile'
import { Country } from 'entities/Country'
import { UserRole } from 'entities/Profile/model/types/profileSchema'
import { Currency } from 'entities/Currency'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    profile: profileReducer,
}
const teamMember: Partial<StateSchema> = {
    profile: {
        readonly: true,
        isLoading: false,
        error: undefined,
        data: {
            firstname:'Tatiana',
            lastname:'Gorelova',
            currency:Currency.RUB,
            country:Country.Russia,
            city:'Zvenigorod',
            username:'tratata',
            avatar:'https://avatars.githubusercontent.com/u/107557323?v=4',
            roles: [UserRole.TEAM_MEMBER]
        },
        form: {
            firstname:'Tatiana',
            lastname:'Gorelova',
            currency:Currency.RUB,
            country:Country.Russia,
            city:'Zvenigorod',
            username:'tratata',
            avatar:'https://avatars.githubusercontent.com/u/107557323?v=4'
        }
    }
}
export const TeamMemberStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={teamMember} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)