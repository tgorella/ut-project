import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProjectSelect } from './ProjectSelect'
import { EditProjectStoreDecorator } from '@/shared/config/storybook/StoreDecorator/ProjectStoreDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProjectSelect> = {
    title: 'entities/Project/Select',
    component: ProjectSelect,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ProjectSelect>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        value: 'ksjdhfhdf343',
        onChange: () => {}                                                                                                           
    },
    decorators: [
        WithColorsTheme,
        EditProjectStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}