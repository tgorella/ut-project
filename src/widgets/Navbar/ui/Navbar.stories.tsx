import type {  Meta, StoryObj } from '@storybook/react'
import { Navbar } from './Navbar'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'

const meta: Meta<typeof Navbar> = {
    title: 'widgets/Navbar',
    component: Navbar,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
}


export default meta
type Story = StoryObj<typeof Navbar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme
    ]
}
