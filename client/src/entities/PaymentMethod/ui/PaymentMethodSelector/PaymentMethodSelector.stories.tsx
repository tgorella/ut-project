import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { paymentMethodsStoreDecorator } from '@/shared/config/storybook/StoreDecorator/PaymentMethodStoreDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PaymentMethodSelector> = {
    title: 'entities/PaymentMethod/Selector',
    component: PaymentMethodSelector,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PaymentMethodSelector>;

export const Default: Story = {
    args: {
        value: '3',
        onChange: () => {},
    },
    decorators: [WithColorsTheme, paymentMethodsStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
