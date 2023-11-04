import type {  Meta, StoryObj } from '@storybook/react'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProfileStoreDecorator } from 'shared/config/storybook/StoreDecorator/ProfileStoreDecorator'
import { ProfileCard } from './ProfileCard'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

const meta: Meta<typeof ProfileCard> = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
    args: {
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
        readonly: true
    },
    decorators: [
        WithColorsTheme,
        ProfileStoreDecorator
    ]
}
export const Loading: Story = {
    args: {
        isLoading: true
    },
    decorators: [
        WithColorsTheme,
        ProfileStoreDecorator
    ]
}

export const WithError: Story = {
    args: {
        error: 'error'
    },
    decorators: [
        WithColorsTheme,
        ProfileStoreDecorator
    ]
}

export const EditMode: Story = {
    args: {
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
        readonly: false
    },
    decorators: [
        WithColorsTheme,
        ProfileStoreDecorator
    ]
}