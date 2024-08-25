import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import {
    eventTypesEditErrorStoreDecorator,
    eventTypesEditIsLoadingStoreDecorator,
    eventTypesEditStoreDecorator,
} from '@/shared/config/storybook/StoreDecorator/EventTypeEditDecorator'
import EventTypesEdit from './EventTypesEdit'

const meta: Meta<typeof EventTypesEdit> = {
    title: 'widgets/EventTypesEdit',
    component: EventTypesEdit,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EventTypesEdit>;

export const Default: Story = {
    args: {},
    decorators: [WithColorsTheme, eventTypesEditStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
export const IsLoading: Story = {
    args: {},
    decorators: [WithColorsTheme, eventTypesEditIsLoadingStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}

export const WithError: Story = {
    args: {},
    decorators: [WithColorsTheme, eventTypesEditErrorStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
