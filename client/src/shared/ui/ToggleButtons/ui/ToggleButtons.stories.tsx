import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ToggleButtons } from './ToggleButtons'

const meta: Meta<typeof ToggleButtons> = {
    title: 'shared/ToggleButtons',
    component: ToggleButtons,
    argTypes: {
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ToggleButtons>;

export const Default: Story = {
    args: {
        values: [{title: '10', value: 10},
            {title: '25', value: 25},
            {title: '50', value: 50},
            {title: '100', value: 100}],
        onChange: () => {},
        currentValue: 50                                                                                                                                           
    },
    decorators: [
        WithColorsTheme
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}