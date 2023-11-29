import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { Box } from './Box'
import { Pagination } from 'shared/ui/Pagination'
import { Text } from 'shared/ui/Text'


const meta: Meta<typeof Box> = {
    title: 'shared/Box',
    component: Box,
    argTypes: {
    },
    tags: ['autodocs']
}

// eslint-disable-next-line i18next/no-literal-string
const content = <Text text='Клиентов пока нет'/>

const pagination = <Pagination currentPage={2} itemsLength={64} itemsPerPage={30} onPageChange={() => {}} />

export default meta
type Story = StoryObj<typeof Box>;

export const Default: Story = {
    args: {
        children: content
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

export const WithHeader: Story = {
    args: {
        header: 'Clients',
        children: content
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

export const WithFooter: Story = {
    args: {
        header: 'Clients',
        footer: pagination,
        children: content
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
