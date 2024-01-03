import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { DelOrderButton } from './DelOrderButton'
import { ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { orderDetailsStoreDecorator } from 'shared/config/storybook/StoreDecorator/OrderDetailsStoreDecorator'

const meta: Meta<typeof DelOrderButton> = {
    title: 'widgets/DelOrderButton',
    component: DelOrderButton,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof DelOrderButton>;

export const Default: Story = {
    args: {
        buttonTheme: ButtonTheme.OUTLINED,
        buttonText:'Удалить заказ',
        orderId: '13235',
        warningText: 'Внимание! Это действие необратимо. Все еще хотите удалить заказ?'                                                                                                                                               
    },
    decorators: [
        WithColorsTheme,
        orderDetailsStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}