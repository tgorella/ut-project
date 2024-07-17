import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import  OrderStatusEdit  from './OrderStatusEdit'
import { orderStatusesEditErrorStoreDecorator, orderStatusesEditIsLoadingStoreDecorator, orderStatusesEditStoreDecorator } from '@/shared/config/storybook/StoreDecorator/OrderStatusesEditDecorator'

const meta: Meta<typeof OrderStatusEdit> = {
    title: 'widgets/OrderStatusEdit',
    component: OrderStatusEdit,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof OrderStatusEdit>;


export const Default: Story = {
    args: {
                                                                                                                                                          
    },
    decorators: [
        WithColorsTheme,
        orderStatusesEditStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}

export const WithError: Story = {
    args: {
                                                                                                                                                        
    },
    decorators: [
        WithColorsTheme,
        orderStatusesEditErrorStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}

export const Loading: Story = {
    args: {
                                                                                                                                                      
    },
    decorators: [
        WithColorsTheme,
        orderStatusesEditIsLoadingStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}