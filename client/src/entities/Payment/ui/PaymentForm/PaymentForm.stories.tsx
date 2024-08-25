import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { PaymentForm } from './PaymentForm'
import { paymentMethodsStoreDecorator } from '@/shared/config/storybook/StoreDecorator/PaymentMethodStoreDecorator'

const meta: Meta<typeof PaymentForm> = {
    title: 'entities/Payment/Form',
    component: PaymentForm,
    argTypes: {
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PaymentForm>;

export const Default: Story = {
    args: {
        errors: {},
        data: {},
        onChangeAmount: () => {},
        onChangeDate: () => {},
        onChangeMethod: () => {},
        onChangeNotes: () => {},
        onChangeNumber: () => {},
        onChangeOrder: () => {},
        onSavePayment: () => {},
    },
    decorators: [WithColorsTheme, paymentMethodsStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
