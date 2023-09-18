import type {  Meta, StoryObj } from '@storybook/react'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
    title: 'widgets/Modal',
    component: Modal,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
}

export default meta
type Story = StoryObj<typeof Modal>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
        isOpen: true,
    },
    decorators: [
        WithColorsTheme
    ]
}
