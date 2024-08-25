import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { OrderStatusSelect } from './OrderStatusSelect'
import { orderStatusesStoreDecorator } from '@/shared/config/storybook/StoreDecorator/orderStatusStoreDecorator'

const meta: Meta<typeof OrderStatusSelect> = {
    title: 'entities/OrderStatusSelect',
    component: OrderStatusSelect,
    argTypes: {},
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OrderStatusSelect>;

export const Default: Story = {
    args: {
        value: '64492fd3d206f2a8b5f4298e',
        onChange: () => {},
    },
    decorators: [WithColorsTheme, orderStatusesStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
