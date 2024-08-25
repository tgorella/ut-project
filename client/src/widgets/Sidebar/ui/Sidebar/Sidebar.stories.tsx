import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import {
    LogoutUserStoreDecorator,
    UserStoreDecorator,
} from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof Sidebar> = {
    title: 'widgets/Sidebar',
    component: Sidebar,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof Sidebar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LogoutUser: Story = {
    args: {},
    decorators: [WithColorsTheme, LogoutUserStoreDecorator],
}

export const LogInUser: Story = {
    args: {},
    decorators: [WithColorsTheme, UserStoreDecorator],
}
