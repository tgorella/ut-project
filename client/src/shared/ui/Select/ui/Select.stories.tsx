import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Select } from './Select'
import { Option } from '../model/types/option'
import { Currency } from '@/entities/Currency'

const meta: Meta<typeof Select> = {
    title: 'shared/Select',
    component: Select,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof Select>;

const options: Option[] = [
    {name: Currency.EUR, value: Currency.EUR},
    {name: Currency.RUB, value: Currency.RUB},
    {name: Currency.USD, value: Currency.USD},
]

export const Default: Story = {
    args: {
        options: options,
        value:Currency.USD,
        label: 'Выберите валюту',
        onChange: () => {}
    },
    decorators: [
        WithColorsTheme
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}