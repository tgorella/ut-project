import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { PaymentMethodForm } from './PaymentMethodForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PaymentMethodForm> = {
    title: 'entities/PaymentMethod/Form',
    component: PaymentMethodForm,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof PaymentMethodForm>;


export const Default: Story = {
    args: {
        data: {
            name: 'Банк',
            icon_url: ''
        },
        errors: {
            name: '',
            icon_url: ''
        },
        onChangeLogoLink: () => {},
        onChangeName: () => {},                                                                                             
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