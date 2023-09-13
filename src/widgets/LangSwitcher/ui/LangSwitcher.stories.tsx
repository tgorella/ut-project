import type { Meta, StoryObj } from '@storybook/react'
import { DarkDecorator } from 'shared/config/storybook/ThemeDecorator/DarkDecorator'
import { LightDecorator } from 'shared/config/storybook/ThemeDecorator/LightDecorator'
import { LangSwitcher } from './LangSwitcher'

const meta: Meta<typeof LangSwitcher> = {
    title: 'widgets/LangSwitcher',
    component: LangSwitcher,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
}


export default meta
type Story = StoryObj<typeof LangSwitcher>;

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