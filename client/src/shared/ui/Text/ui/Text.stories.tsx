import type { Meta, StoryObj } from '@storybook/react'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Text, TextTheme } from './Text'

const meta: Meta<typeof Text> = {
    title: 'shared/Text',
    component: Text,
    argTypes: {},
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>;

export const Default: Story = {
    args: {
        title: 'This is a title',
        text: 'And this is a text block',
    },
    decorators: [WithColorsTheme],
}

export const OnlyTitle: Story = {
    args: {
        title: 'This is a title',
    },
    decorators: [WithColorsTheme],
}

export const OnlyText: Story = {
    args: {
        text: 'And this is a text block',
    },
    decorators: [WithColorsTheme],
}

export const WarningText: Story = {
    args: {
        text: 'This is warning text',
        theme: TextTheme.WARNING,
    },
    decorators: [WithColorsTheme],
}
