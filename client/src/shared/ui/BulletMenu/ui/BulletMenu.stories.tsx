import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { BulletMenu } from './BulletMenu'
import { bulletMenuItemSchema } from '../model/types/bulletMenuItemSchema'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BulletMenu> = {
    title: 'shared/BulletMenu',
    component: BulletMenu,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}

const items: bulletMenuItemSchema[] = [
    {
        elementName: 'link1',
        text: 'Ссылка 1'
    },
    {
        elementName: 'link2',
        text: 'Ссылка 2'
    },
    {
        elementName: 'link3',
        text: 'Ссылка 3'
    }
]

export default meta
type Story = StoryObj<typeof BulletMenu>;


export const Default: Story = {
    args: {
        items: items,
        path: 'link1',
        onClick: () => {}                                                                                                                                                  
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