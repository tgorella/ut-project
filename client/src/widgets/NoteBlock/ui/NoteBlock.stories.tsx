import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { NoteBlock } from './NoteBlock'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof NoteBlock> = {
    title: 'widgets/NoteBlock',
    component: NoteBlock,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NoteBlock>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        value: 'Few [b]words[/b] to remember',
        onCancelEdit: () => {},
        onChange: () => {},
        onSave: () => {},
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
