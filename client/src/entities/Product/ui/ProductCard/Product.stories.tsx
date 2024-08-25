import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProductCard } from './ProductCard'
import { productDetailsStoreDecorator } from '@/shared/config/storybook/StoreDecorator/ProductDetailStoreDecorator'
// import { ProductType } from '../../model/types/Product'

const meta: Meta<typeof ProductCard> = {
    title: 'entities/Product/Card',
    component: ProductCard,
    argTypes: {},
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
    args: {},
    decorators: [WithColorsTheme, productDetailsStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
