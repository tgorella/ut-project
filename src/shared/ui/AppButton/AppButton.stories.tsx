import type { Meta, StoryObj } from '@storybook/react'
import { AppButton, ThemeButton } from './AppButton'
import 'app/styles/index.scss'
import { DarkDecorator } from 'shared/config/storybook/ThemeDecorator/DarkDecorator'
import { LightDecorator } from 'shared/config/storybook/ThemeDecorator/LightDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppButton> = {
    title: 'shared/Button',
    component: AppButton,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
}


export default meta
type Story = StoryObj<typeof AppButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SolidDark: Story = {
    args: {
        theme: ThemeButton.SOLID,
        children: 'Button',
    },
    decorators: [
        DarkDecorator
    ]
}

export const SolidLight: Story = {
    args: {
        theme: ThemeButton.SOLID,
        children: 'Button',
    },
    decorators: [
        LightDecorator
    ]
}

export const ClearDark: Story = {
    args: {
        theme: ThemeButton.CLEAR,
        children: 'Button',
    },
    decorators: [
        DarkDecorator
    ]
}

export const ClearLight: Story = {
    args: {
        theme: ThemeButton.CLEAR,
        children: 'Button',
    },
    decorators: [
        LightDecorator
    ]
}

export const OutlinedDark: Story = {
    args: {
        theme: ThemeButton.OUTLINED,
        children: 'Button',
    },
    decorators: [
        DarkDecorator
    ]
}

export const OutlinedLight: Story = {
    args: {
        theme: ThemeButton.OUTLINED,
        children: 'Button',
    },
    decorators: [
        LightDecorator
    ]
}