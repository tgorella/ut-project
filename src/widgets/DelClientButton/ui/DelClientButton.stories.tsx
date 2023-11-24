import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { orderDetailsStoreDecorator } from 'shared/config/storybook/StoreDecorator/OrderDetailsStoreDecorator'
import { DelClientButton } from './DelClientButton'

const meta: Meta<typeof DelClientButton> = {
    title: 'widgets/DelClientButton',
    component: DelClientButton,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof DelClientButton>;

export const Default: Story = {
    args: {
        buttonTheme: ButtonTheme.OUTLINED,
        buttonText:'Удалить клиента',
        clientId: '13235',
        warningText: 'Внимание! Это действие необратимо. Все еще хотите удалить клиента?'                                                                                                                                               
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