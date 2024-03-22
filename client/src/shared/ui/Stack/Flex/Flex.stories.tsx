/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Flex } from './Flex'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Flex> = {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}
     
export default meta
type Story = StoryObj<typeof Flex>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Row: Story = {
    args: {
        children: (
            <>
                <div>Item</div>
                <div>Item</div>
                <div>Item</div>
            </>
        ),
        direction: 'row',
        justify: 'start',
        align: 'start'                                                                             
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
export const RowSpaceBetween: Story = {
    args: {
        children: (
            <>
                <div>Item</div>
                <div>Item</div>
                <div>Item</div>
            </>
        ),
        direction: 'row',
        justify: 'between',
        align: 'start'                                                                             
    },
    decorators: [
        WithColorsTheme
    ]
}
export const RowGap10: Story = {
    args: {
        children: (
            <>
                <div>Item</div>
                <div>Item</div>
                <div>Item</div>
            </>
        ),
        direction: 'row',
        justify: 'start',
        align: 'start',
        gap: '10'                                                                               
    },
    decorators: [
        WithColorsTheme
    ]
}

export const RowGap20: Story = {
    args: {
        children: (
            <>
                <div>Item</div>
                <div>Item</div>
                <div>Item</div>
            </>
        ),
        direction: 'row',
        justify: 'start',
        align: 'start',
        gap: '20'                                                                               
    },
    decorators: [
        WithColorsTheme
    ]
}

export const Column: Story = {
    args: {
        children: (
            <>
                <div>Item</div>
                <div>Item</div>
                <div>Item</div>
            </>
        ),
        direction: 'column',
        justify: 'start',
        align: 'start'                                                                              
    },
    decorators: [
        WithColorsTheme
    ]
}

export const ColumnGap30: Story = {
    args: {
        gap: '30',
        children: (
            <>
                <div>Item</div>
                <div>Item</div>
                <div>Item</div>
            </>
        ),
        direction: 'column',
        justify: 'start',
        align: 'start'                                                                              
    },
    decorators: [
        WithColorsTheme
    ]
}

