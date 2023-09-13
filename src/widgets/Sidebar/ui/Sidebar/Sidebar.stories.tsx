import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { DarkDecorator } from 'shared/config/storybook/ThemeDecorator/DarkDecorator'
import { LightDecorator } from 'shared/config/storybook/ThemeDecorator/LightDecorator'

const meta: Meta<typeof Sidebar> = {
    title: 'widgets/Sidebar',
    component: Sidebar,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
}


export default meta
type Story = StoryObj<typeof Sidebar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Dark: Story = {
    args: {
    },
    decorators: [
        DarkDecorator
    ]
}

export const Light: Story = {
    args: {
    },
    decorators: [
        LightDecorator
    ]
}