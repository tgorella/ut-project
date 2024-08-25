import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { OrderStatusBlock } from './OrderStatusBlock'
import { orderStatusesStoreDecorator } from '@/shared/config/storybook/StoreDecorator/orderStatusStoreDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OrderStatusBlock> = {
    title: 'shared/OrderStatusBlock',
    component: OrderStatusBlock,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OrderStatusBlock>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        status: {
            _id: '643e58efaba80539138865d2',
            name: 'Test status',
            color: 'gold',
        },
    },
    decorators: [WithColorsTheme, orderStatusesStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
