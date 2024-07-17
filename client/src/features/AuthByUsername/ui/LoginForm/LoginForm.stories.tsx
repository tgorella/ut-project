import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { LoginFormStoreDecorator, LoginFormStoreDecoratorLoading, LoginFormStoreDecoratorWithError } from '@/shared/config/storybook/StoreDecorator/LoginFormStoreDecorator'
import LoginForm from './LoginForm'

const meta: Meta<typeof LoginForm> = {
    title: 'features/LoginForm',
    component: LoginForm,
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme,
        LoginFormStoreDecorator
        
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'hide'}
        },
    }
}

export const WithError: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme,
        LoginFormStoreDecoratorWithError
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'hide'}
        },
    }
}

export const Loading: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme,
        LoginFormStoreDecoratorLoading
        
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'hide'}
        },
    }
}