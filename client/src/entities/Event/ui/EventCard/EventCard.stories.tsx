import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { EventCard } from './EventCard'
import { Event } from 'entities/Event/model/types/Event'

const meta: Meta<typeof EventCard> = {
    title: 'entities/EventCard',
    component: EventCard,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof EventCard>;

const event: Event = {
    title: 'Тестовое событие',
    eventDate: '2024-02-12',
    startTime: '12:00',
    endTime: '15:00',
    place: 'Moscow',
    eventType: 'personal',
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