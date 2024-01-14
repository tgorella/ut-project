import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { SettingPage } from './SettingPage'
import { orderStatusesEditStoreDecorator } from 'shared/config/storybook/StoreDecorator/OrderStatusesEditDecorator'

const meta: Meta<typeof SettingPage> = {
    title: 'pages/SettingPage',
    component: SettingPage,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof SettingPage>;


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