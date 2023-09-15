import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'

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
export const Default: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme
    ]
}