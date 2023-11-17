import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import OrderDetailsPage from './OrderDetailsPage'
import { orderDetailsStoreDecorator } from 'shared/config/storybook/StoreDecorator/OrderDetailsStoreDecorator'
import { clientDetailsStoreDecorator } from 'shared/config/storybook/StoreDecorator/clientDetailsStoreDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OrderDetailsPage> = {
    title: 'pages/OrderDetailsPage',
    component: OrderDetailsPage,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof OrderDetailsPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
                                                                                                                                                          
    },
    decorators: [
        WithColorsTheme,
        orderDetailsStoreDecorator,
        clientDetailsStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}