import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { EventTypeInput } from './EventTypeInput'
import { EventType } from '../../model/types/EventType'

const meta: Meta<typeof EventTypeInput> = {
    title: 'entities/EventType/Input',
    component: EventTypeInput,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof EventTypeInput>;

const type : EventType = {
    _id: 'sdfsd4dfg5467fgrgf',
    color: '#9ddf70',
    name: 'Друзья',
    isDefault: false
}

export const Default: Story = {
    args: {
        itemData: type
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

export const EditMode: Story = {
    args: {
        itemData: type,
        editInputId: type._id                                                                                                                        
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