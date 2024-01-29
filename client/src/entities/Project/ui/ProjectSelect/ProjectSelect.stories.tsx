import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProjectSelect } from './ProjectSelect'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProjectSelect> = {
    title: 'entities/ProjectSelect',
    component: ProjectSelect,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}

const projectsArr = [
    {
        _id: 'jhmgjh54rhre',
        name: 'Разработка бренд бука',
        userId: 'апвапр',
        stages: []
    },
    {
        _id: 'jha8475fdsgf',
        name: 'Разработка логотипа',
        userId: 'апвапр',
        stages: []
    },
    {
        _id: 'ksjdhfhdf343',
        name: 'Разработка фирменного стиля',
        userId: 'апвапр',
        stages: []
    }
]
export default meta
type Story = StoryObj<typeof ProjectSelect>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        projects: projectsArr,
        value: 'jha8475fdsgf',
        onChange: () => {}                                                                                                              
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