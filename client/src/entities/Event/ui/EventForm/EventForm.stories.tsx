import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { EventExtended } from '../../model/types/Event'
import { EventForm } from './EventForm'

const meta: Meta<typeof EventForm> = {
    title: 'entities/Event/Form',
    component: EventForm,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof EventForm>;

const event: EventExtended = {
    title: 'Тестовое событие',
    eventDate: '2024-02-12',
    startTime: '12:00',
    endTime: '15:00',
    place: 'Moscow',
    eventType: {
        _id: '643e58efaba80539138865d2',
        name: 'personal',
        color: '#ff759f',
        isDefault: false
    },
    _id: 'sldjlsdj893945mnbxwe8',
    notes: 'Не забыть с собой документы',
    userId: '9348kjr873l34'
}

export const Default: Story = {
    args: {
        data: event,
        events: [{
            _id: '643e58deaba80539138865d0',
            name: 'Учеба',
            color: '#bde2a8',
            isDefault: false
        },
        {
            _id: '643e58efaba80539138865d2',
            name: 'Личное',
            color: '#ff759f',
            isDefault: false
        },
        {
            _id: '643e5900aba80539138865d4',
            name: 'Семья',
            color: 'gray',
            isDefault: false
        },
        {
            _id: '6467834500aba6813881d4',
            name: 'Друзья',
            color: 'blue',
            isDefault: false
        }
        ],
        errors: {},
        onSave: () => {}
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

