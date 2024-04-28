import type { Meta, StoryObj } from '@storybook/react'
import  '@/app/styles/index.scss'
import { WithColorsTheme } from  '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProductDetailsPage } from './ProductDetailsPage'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProductDetailsPage> = {
    title: 'shared/ProductDetailsPage',
    component: ProductDetailsPage,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof ProductDetailsPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
                                                                                                                                                          
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