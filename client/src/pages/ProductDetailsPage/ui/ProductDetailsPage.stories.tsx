import type { Meta, StoryObj } from '@storybook/react'
import  '@/app/styles/index.scss'
import { WithColorsTheme } from  '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProductDetailsPage } from './ProductDetailsPage'
import { productDetailsErrorStoreDecorator, productDetailsIsLoadingStoreDecorator, productDetailsStoreDecorator } from '@/shared/config/storybook/StoreDecorator/ProductDetailStoreDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProductDetailsPage> = {
    title: 'pages/ProductDetailsPage',
    component: ProductDetailsPage,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof ProductDetailsPage>;


export const Default: Story = {
    args: {
                                                                                                                                                          
    },
    decorators: [
        WithColorsTheme,
        productDetailsStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}

export const IsLoading: Story = {
    args: {
                                                                                                                                                          
    },
    decorators: [
        WithColorsTheme,
        productDetailsIsLoadingStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}

export const WithError: Story = {
    args: {
                                                                                                                                                          
    },
    decorators: [
        WithColorsTheme,
        productDetailsErrorStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}