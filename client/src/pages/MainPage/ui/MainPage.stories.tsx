import type {  Meta, StoryObj } from '@storybook/react'
import MainPage from './MainPage'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'

const meta: Meta<typeof MainPage> = {
    title: 'pages/MainPage',
    component: MainPage,
    argTypes: {
    // backgroundColor: { control: 'color' },
    }
}


export default meta
type Story = StoryObj<typeof MainPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme
    ]
}