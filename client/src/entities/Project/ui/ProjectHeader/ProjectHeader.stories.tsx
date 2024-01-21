import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProjectHeader } from './ProjectHeader'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProjectHeader> = {
    title: 'entities/ProjectHeader',
    component: ProjectHeader,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof ProjectHeader>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        projectName: 'Brand book',
        stages: [{
            name: 'Подготовка',
            _id: 'sdflj46lgjdfjg',
            userId: '',
            projectId: '',
            index: 0,
            steps: [
                {_id: 'ldkjg54dg',
                    name: 'Договор',
                    userId:'',
                    stageId: '',
                    index: 0},
                {_id: 'ld65kjgsdfdg',
                    name: 'Аванс',
                    userId:'',
                    stageId: '',
                    index: 0},
                {_id: 'ldas5akj6gdg',
                    name: 'ТЗ / Опросник',
                    userId:'',
                    stageId: '',
                    index: 0},
                {_id: 'a5sda35sddg',
                    name: 'Чек',
                    userId:'',
                    stageId: '',
                    index: 0},
                {_id: 's287dfg',
                    name: 'Бугалтерия',
                    userId:'',
                    stageId: '',
                    index: 0}
            ]
        },
        {
            name: 'Разработка',
            _id: 'sdf456kljsdf94fjg',
            userId: '',
            projectId: '',
            index: 0,
            steps: [
                {_id: 'ldk46jgdg',
                    name: 'Исследование',
                    userId:'',
                    stageId: '',
                    index: 0},
                {_id: 'ld46jgsdf5dg',
                    name: 'Разработка макета',
                    userId:'',
                    stageId: '',
                    index: 0},
                {_id: 'lda789dakjgdg',
                    name: 'Согласование',
                    userId:'',
                    stageId: '',
                    index: 0},
                {_id: 'a357asddg',
                    name: 'Правки',
                    userId:'',
                    stageId: '',
                    index: 0}
            ]
        },
        {
            name: 'Завершение',
            _id: 'sdfljasfds3453lgj3fjg',
            userId: '',
            projectId: '',
            index: 0,
            steps: [
                {_id: 'ld35jgdg',
                    name: 'Оплата',
                    userId:'',
                    stageId: '',
                    index: 0},
                {_id: 'l74kjgsdfdg',
                    name: 'Отправить файл',
                    userId:'',
                    stageId: '',
                    index: 0},
                {_id: 'lda35akjgdg',
                    name: 'Отзыв',
                    userId:'',
                    stageId: '',
                    index: 0}
            ]
        }]
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