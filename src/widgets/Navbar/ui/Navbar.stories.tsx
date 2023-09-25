import type {  Meta, StoryObj } from '@storybook/react'
import { Navbar } from './Navbar'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { LogoutUserStoreDecorator, UserStoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof Navbar> = {
    title: 'widgets/Navbar',
    component: Navbar,
    argTypes: {
    },
}


export default meta
type Story = StoryObj<typeof Navbar>;

export const Login: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme,
        UserStoreDecorator
        
    ]
}

export const Logout: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme,
        LogoutUserStoreDecorator
      
    ]
}
