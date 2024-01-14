import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { OrderStatusInput } from './OrderStatusInput'
import { OrderStatusDetails } from 'entities/OrderStatus/model/types/OrderStatus'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OrderStatusInput> = {
    title: 'shared/OrderStatusInput',
    component: OrderStatusInput,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}

const status : OrderStatusDetails = {
    _id: 'sdfsd4dfg5467fgrgf',
    color: '#fe67ce',
    name: 'In progress',
    isDefault: false
}
export default meta
type Story = StoryObj<typeof OrderStatusInput>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        itemData: status                                                                                                                        
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
export const EditMode: Story = {
    args: {
        itemData: status,
        editInputId: status._id                                                                                                                        
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