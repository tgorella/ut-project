import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProjectRow } from './ProjectRow'
import { Order } from 'entities/Order'
import { Client } from 'entities/Clients'
import { OrderStatusDetails } from 'entities/OrderStatus'
import { EditProjectStoreDecorator } from 'shared/config/storybook/StoreDecorator/ProjectStoreDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProjectRow> = {
    title: 'entities/ProjectStatusRow',
    component: ProjectRow,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}

const order: Order = {
    clientId: 'sdjldsjflsdjk',
    total: '20000',
    notes: '',
    eventDate: '',
    eventType: '',
    orderNumber: '',
    status: '',
    title: 'Брендбук Vaf work',
    userId: '',
    projectType: '',
    steps: ['done','done','in_progress','in_progress','','','','','','','']
}

const client: Client = {
    name: 'Kristina Gold'
}

const status: OrderStatusDetails = {
    _id: 'sdlk89ftgd7jskgfrdfk',
    name: 'В процессе',
    color: '#ffd129',
    isDefault: false
}
export default meta
type Story = StoryObj<typeof ProjectRow>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        status: status,      
        client: client,
        order: order                                                                                                                                     
    },
    decorators: [
        WithColorsTheme,
        EditProjectStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}