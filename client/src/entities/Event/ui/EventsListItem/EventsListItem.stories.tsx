import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Event } from '../../model/types/Event'
import { EventListItem } from './EventsListItem'

const meta: Meta<typeof EventListItem> = {
    title: 'entities/Event/ListItem',
    component: EventListItem,
    argTypes: {},
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EventListItem>;

const event: Event = {
    title: 'Стоматолог',
    eventDate: '2024-02-12',
    startTime: '12:00',
    endTime: '15:00',
    place: 'Москва, ул. Некрасова 21',
    eventType: 'personal',
    _id: 'sldjlsdj893945mnbxwe8',
    notes: 'Не забыть с собой документы',
    userId: '9348kjr873l34',
}

export const Default: Story = {
    args: {
        event: event,
        color: 'rgb(255, 209, 41)',
    },
    decorators: [WithColorsTheme],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
