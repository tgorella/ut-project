import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { EditSwitcher } from './EditSwitcher'


const meta: Meta<typeof EditSwitcher> = {
    title: 'widgets/EditSwitcher',
    component: EditSwitcher,
    argTypes: {
    },
    tags: ['autodocs']
}

let mode = false

const toggleMode = () => {
    if (mode === false) {
        mode = true
    }
    if (mode === true) {
        mode = false
    }
}

export default meta
type Story = StoryObj<typeof EditSwitcher>;

export const Edit: Story = {
    args: {
        editMode: mode,
        toggleEditMode: toggleMode
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

export const Close: Story = {
    args: {
        editMode: mode,
        toggleEditMode: toggleMode
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
