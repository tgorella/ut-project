import type { Meta, StoryObj } from '@storybook/react'
import 'app/styles/index.scss'
import { WithColorsTheme } from 'shared/config/storybook/ThemeDecorator/WithColorsTheme'
import { ClientCard } from './ClientCard'
import { clientDetailsErrorStoreDecorator, clientDetailsIsLoadingStoreDecorator, clientDetailsStoreDecorator } from 'shared/config/storybook/StoreDecorator/clientDetailsStoreDecorator'

const meta: Meta<typeof ClientCard> = {
    title: 'entities/ClientCard',
    component: ClientCard,
    argTypes: {
    },
    tags: ['autodocs']
}


export default meta
type Story = StoryObj<typeof ClientCard>;


export const Default: Story = {
    args: {
        id: '643c5fe7013e22868a6eb63c'                                                                                                                                           
    },
    decorators: [
        WithColorsTheme,
        clientDetailsStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}

export const OnlyRead: Story = {
    args: {
        id: '643c5fe7013e22868a6eb63c',
        onlyRead: true                                                                                                                                           
    },
    decorators: [
        WithColorsTheme,
        clientDetailsStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}

export const WithoutNotes: Story = {
    args: {
        id: '643c5fe7013e22868a6eb63c',
        withNotes: false                                                                                                                                          
    },
    decorators: [
        WithColorsTheme,
        clientDetailsStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}

export const NotFound: Story = {
    args: {
        id: '000'                                                                                                                                           
    },
    decorators: [
        WithColorsTheme,
        clientDetailsErrorStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}

export const IsLoading: Story = {
    args: {
        id: '000'                                                                                                                                           
    },
    decorators: [
        WithColorsTheme,
        clientDetailsIsLoadingStoreDecorator
    ],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'}
        },
    }
}