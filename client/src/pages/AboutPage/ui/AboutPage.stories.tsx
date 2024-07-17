import type {  Meta, StoryObj } from '@storybook/react'
import AboutPage from './AboutPage'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'

const meta: Meta<typeof AboutPage> = {
    title: 'pages/AboutPage',
    component: AboutPage,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
        children: 'Text'
    }
}


export default meta
type Story = StoryObj<typeof AboutPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme
    ]
}
