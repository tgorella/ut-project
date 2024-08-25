import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Dropdown } from './Dropdown'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Dropdown> = {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs'],
}

const items = [
    {
        content: 'Item 1',
    },
    {
        content: 'Item 2',
    },
]
export default meta
type Story = StoryObj<typeof Dropdown>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const TopRight: Story = {
    args: {
        position: 'top-right',
        trigger: 'Click me',
        items: items,
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}

export const TopLeft: Story = {
    args: {
        position: 'top-left',
        trigger: 'Click me',
        items: items,
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}

export const BottomRight: Story = {
    args: {
        position: 'bottom-right',
        trigger: 'Click me',
        items: items,
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
export const BottomLeft: Story = {
    args: {
        position: 'bottom-left',
        trigger: 'Click me',
        items: items,
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
