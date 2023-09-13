import { RouteDecorator } from './../../src/shared/config/storybook/RouteDecorator/RouteDecorator'
import { styleDecorator } from './../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import type { Preview } from '@storybook/react'
import 'app/styles/index.scss'

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        styleDecorator,
        RouteDecorator
    ],
}

export default preview


