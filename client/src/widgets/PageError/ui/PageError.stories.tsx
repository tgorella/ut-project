import type {  Meta, StoryObj } from '@storybook/react'
import { PageError } from './PageError'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'

const meta: Meta<typeof PageError> = {
    title: 'widgets/PageError',
    component: PageError,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
}


export default meta
type Story = StoryObj<typeof PageError>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
    },
    decorators: [
        WithColorsTheme
    ]
}