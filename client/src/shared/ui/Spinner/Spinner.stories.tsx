import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'

const meta: Meta<typeof Spinner> = {
    title: 'shared/Spinner',
    component: Spinner,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
    args: {},
    decorators: [WithColorsTheme],
}
