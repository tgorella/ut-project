import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProductsPage } from './ProductsPage'
import {
    productPageErrorStoreDecorator,
    productPageIsLoadingStoreDecorator,
    productPageStoreDecorator,
} from '@/shared/config/storybook/StoreDecorator/ProductsStoreDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProductsPage> = {
    title: 'pages/ProductsPage',
    component: ProductsPage,
    argTypes: {},
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProductsPage>;

export const Default: Story = {
    args: {},
    decorators: [WithColorsTheme, productPageStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}

export const IsLoading: Story = {
    args: {},
    decorators: [WithColorsTheme, productPageIsLoadingStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}

export const WithError: Story = {
    args: {},
    decorators: [WithColorsTheme, productPageErrorStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
