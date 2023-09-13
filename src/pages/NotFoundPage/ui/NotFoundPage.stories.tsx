import type {  Meta, StoryObj } from '@storybook/react'
import { DarkDecorator } from 'shared/config/storybook/ThemeDecorator/DarkDecorator'
import { LightDecorator } from 'shared/config/storybook/ThemeDecorator/LightDecorator'
import { NotFoundPage } from './NotFoundPage'

const meta: Meta<typeof NotFoundPage> = {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    argTypes: {
    // backgroundColor: { control: 'color' },
    }
}


export default meta
type Story = StoryObj<typeof NotFoundPage>;

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