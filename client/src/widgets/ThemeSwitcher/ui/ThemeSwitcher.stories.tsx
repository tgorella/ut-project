import type { Meta, StoryObj } from '@storybook/react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'widgets/ThemeSwitcher',
    component: ThemeSwitcher,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
}

export default meta
type Story = StoryObj<typeof ThemeSwitcher>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {},
    decorators: [WithColorsTheme],
}
