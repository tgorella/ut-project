import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { EventCard } from './EventCard'
import { EventExtended } from '../../model/types/Event'

const meta: Meta<typeof EventCard> = {
    title: 'entities/EventCard',
    component: EventCard,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof EventCard>;

const event: EventExtended = {
    title: 'Тестовое событие',
    eventDate: '2024-02-12',
    startTime: '12:00',
    endTime: '15:00',
    place: 'Moscow',
    eventType: {
        _id: '6467834500aba6813881d4',
        name: 'Друзья',
        color: 'blue',
        isDefault: false
    },
    _id: 'sldjlsdj893945mnbxwe8',
    notes: 'Не забыть с собой документы',
    userId: '9348kjr873l34'
}

export const Default: Story = {
    args: {
        event: event                                                                                                                                          
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