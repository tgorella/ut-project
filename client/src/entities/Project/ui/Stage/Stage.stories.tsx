import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Stage } from './Stage'
import { ProjectStage } from '../../model/types/Project'
import { UserStoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Stage> = {
    title: 'entities/Stage',
    component: Stage,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}

const stage : ProjectStage = {
    _id: '',
    name: 'Подготовка',
    userId: '',
    projectId: '',
    index: 0,
    steps: [
        {_id: 'skjfsh',
            name: 'Подписать договор',
            projectId: '',
            userId: '',
            stageId: '',
            index: 1,
        },
        {_id: 'wrwerr453',
            name: 'Заполнить бриф / ТЗ',
            projectId: '',
            userId: '',
            stageId: '',
            index: 2,
        },
        {_id: 's3443ghfhsh',
            name: 'Аванс',
            projectId: '',
            userId: '',
            stageId: '',
            index: 3,
        }
    ]
}
export default meta
type Story = StoryObj<typeof Stage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        stage: stage                                                                                                                                               
    },
    decorators: [
        WithColorsTheme,
        UserStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}