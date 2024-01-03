import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Alert, AlertTheme, AlertVariant } from './Alert'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Alert> = {
    title: 'shared/Alert',
    component: Alert,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof Alert>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        text: 'Some information here',
        description: 'please click here for more information'
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

export const OnlyText: Story = {
    args: {
        text: 'Some information here',
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

export const Warning: Story = {
    args: {
        text: 'Some information here',
        description: 'please click here for more information',
        theme: AlertTheme.WARNING
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


export const Error: Story = {
    args: {
        text: 'Some information here',
        description: 'please click here for more information',
        theme: AlertTheme.ERROR
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

export const Success: Story = {
    args: {
        text: 'Some information here',
        description: 'please click here for more information',
        theme: AlertTheme.SUCCESS
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

export const Outlined: Story = {
    args: {
        text: 'Some information here',
        description: 'please click here for more information',
        theme: AlertTheme.ERROR,
        variant: AlertVariant.OUTLINED
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