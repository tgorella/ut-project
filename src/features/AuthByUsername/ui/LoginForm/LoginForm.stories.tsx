import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { LoginFormStoreDecorator, LoginFormStoreDecoratorLoading, LoginFormStoreDecoratorWithError } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import LoginForm from './LoginForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LoginForm> = {
    title: 'features/LoginForm',
    component: LoginForm,
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof LoginForm>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

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