import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from '@/shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ImageSlider } from './ImageSlider'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ImageSlider> = {
    title: 'shared/ImageSlider',
    component: ImageSlider,
    argTypes: {
    // backgroundColor: { control: 'color' },
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof ImageSlider>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const NoPreview: Story = {
    args: {
        images: [
            'https://basket-12.wbbasket.ru/vol1742/part174261/174261502/images/big/1.webp',
            'https://basket-12.wbbasket.ru/vol1695/part169548/169548656/images/big/1.webp',
            'https://basket-12.wbbasket.ru/vol1740/part174013/174013033/images/c516x688/1.webp',
        ] ,
        withPreview: false,
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

export const DefaultPreview: Story = {
    args: {
        images: [
            'https://basket-12.wbbasket.ru/vol1742/part174261/174261502/images/big/1.webp',
            'https://basket-12.wbbasket.ru/vol1695/part169548/169548656/images/big/1.webp',
            'https://basket-12.wbbasket.ru/vol1740/part174013/174013033/images/c516x688/1.webp',
        ] ,
        withPreview: true,
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
export const LeftPreviewt: Story = {
    args: {
        images: [
            'https://basket-12.wbbasket.ru/vol1742/part174261/174261502/images/big/1.webp',
            'https://basket-12.wbbasket.ru/vol1695/part169548/169548656/images/big/1.webp',
            'https://basket-12.wbbasket.ru/vol1740/part174013/174013033/images/c516x688/1.webp',
        ] ,
        withPreview: true,
        previewSide: 'left',
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

export const BottomPreview: Story = {
    args: {
        images: [
            'https://basket-12.wbbasket.ru/vol1742/part174261/174261502/images/big/1.webp',
            'https://basket-12.wbbasket.ru/vol1695/part169548/169548656/images/big/1.webp',
            'https://basket-12.wbbasket.ru/vol1740/part174013/174013033/images/c516x688/1.webp',
        ] ,
        withPreview: true,
        previewSide: 'bottom',
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