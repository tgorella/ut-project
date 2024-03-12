import type {  Meta, StoryObj } from '@storybook/react'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { CurrencySelect } from './CurrencySelect'
import { Currency } from '../../model/types/сurrency'

const meta: Meta<typeof CurrencySelect> = {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
}


export default meta
type Story = StoryObj<typeof CurrencySelect>;

export const Default: Story = {
    args: {
        value: Currency.RUB
    },
    decorators: [
        WithColorsTheme
    ]
}