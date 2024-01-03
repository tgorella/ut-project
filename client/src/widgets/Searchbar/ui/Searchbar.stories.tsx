import type { Meta, StoryObj } from '@storybook/react'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Searchbar } from './Searchbar'

const meta: Meta<typeof Searchbar> = {
    title: 'widgets/Searchbar',
    component: Searchbar,
    argTypes: {
    },
}


export default meta
type Story = StoryObj<typeof Searchbar>;

export const Default: Story = {
    args: {
        placeholder: 'Введите имя, фамилию или email для поиска',
        onChange: () => {}
    },
    decorators: [
        WithColorsTheme
    ]
}