import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { CalendarPage } from './CalendarPage'
import { CalendarStoreDecorator } from '@/shared/config/storybook/StoreDecorator/CalendarStoreDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CalendarPage> = {
    title: 'pages/CalendarPage',
    component: CalendarPage,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof CalendarPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
                                                                                                                                                          
    },
    decorators: [
        WithColorsTheme,
        CalendarStoreDecorator
        
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}