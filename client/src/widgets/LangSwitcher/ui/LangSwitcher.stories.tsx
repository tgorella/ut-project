import type { Meta, StoryObj } from '@storybook/react'
import { LangSwitcher } from './LangSwitcher'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'

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
export const Default: Story = {
    args: {},
    decorators: [WithColorsTheme],
}
