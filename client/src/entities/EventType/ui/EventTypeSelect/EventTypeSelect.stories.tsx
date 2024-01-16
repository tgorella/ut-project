import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { EventTypeSelect } from './EventTypeSelect'
import { EventType } from '../../model/types/EventType'

const meta: Meta<typeof EventTypeSelect> = {
    title: 'entities/EventTypeSelect',
    component: EventTypeSelect,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof EventTypeSelect>;

const types: EventType[] = [
    {
        _id: 'sjfgdhkjs8437gsdk39',
        name: 'Личное',
        color: '#EA93FE',
        isDefault: false
    },
    {
        _id: 'kjhds52m23l843',
        name: 'Семья',
        color: '#9693fe',
        isDefault: false
    },
    {
        _id: 'sdfsdf347hjk899234v',
        name: 'Друзья',
        color: '#9ddf70',
        isDefault: false
    }
]

export const Default: Story = {
    args: {
        eventTypes: types,
        value: 'sdfsdf347hjk899234v',
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