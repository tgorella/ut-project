import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProjectStepSelect } from './ProjectStepSelect'

const meta: Meta<typeof ProjectStepSelect> = {
    title: 'entities/Project/StepStatusSelect',
    component: ProjectStepSelect,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProjectStepSelect>;

export const Default: Story = {
    args: {
        stepValue: '',
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
export const InProgress: Story = {
    args: {
        stepValue: 'in_progress',
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
export const Pause: Story = {
    args: {
        stepValue: 'paused',
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
export const Done: Story = {
    args: {
        stepValue: 'done',
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
export const Warning: Story = {
    args: {
        stepValue: 'warning',
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
