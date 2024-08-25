import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ProductForm } from './ProductForm'
import { productDetailsStoreDecorator } from '@/shared/config/storybook/StoreDecorator/ProductDetailStoreDecorator'
import { ProductType } from '@/entities/Product/model/types/Product'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProductForm> = {
    title: 'entities/Product/Form',
    component: ProductForm,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProductForm>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
    args: {
        product: {
            _id: '1',
            name: 'Product 1',
            price: 100,
            description: 'Диффузор для дома создаст приятную атмосферу и освежит любое помещение. Соленая карамель - это отличный декор и аромат вашего дома. Диффузор Terin House — ароматизатор воздуха на селективных французских ароматических маслах со стойкостью до 1-2 месяца. Композиция ароматизатора для квартиры «Соленая карамель» с насыщенными, но не приторными нотами создаут атмосферу свежести на площади до 30 м². Парфюм Представляет собой емкость с ароматическими маслами, в которую вставляются фибровые аромапалочки, мягко распространяющие аромат по всему пространству комнаты. Ароматизатор для дома подходит для любых помещений. Может не только наполнить туалет или ванную утонченным ароматом, но и сделать другие домашние комнаты более уютными. Тщательно продуманная формула яркого и интригующего нежного аромата освежителя для комнаты поможет нейтрализовать запахи еды на кухне. ',
            discount: 10,
            count: 150,
            productType: ProductType.PRODUCT,
            productCode: 'CA009',
            img: [
                'https://basket-12.wbbasket.ru/vol1742/part174261/174261502/images/big/1.webp',
                'https://basket-12.wbbasket.ru/vol1695/part169548/169548656/images/big/1.webp',
                'https://basket-12.wbbasket.ru/vol1740/part174013/174013033/images/c516x688/1.webp',
                'https://basket-13.wbbasket.ru/vol1921/part192181/192181377/images/big/1.webp',
                'https://basket-14.wbbasket.ru/vol2187/part218782/218782248/images/c516x688/1.webp'
            ],
            category: 'Товары для дома',
            subcategory: '',
            userId: 'jhgjg'
        },
        errors: {}
    },
    decorators: [WithColorsTheme, productDetailsStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
}
