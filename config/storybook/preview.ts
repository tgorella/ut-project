import { TranslationDecorator } from './../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator'
import { RouteDecorator } from './../../src/shared/config/storybook/RouteDecorator/RouteDecorator'
import { styleDecorator } from './../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import type { Preview } from '@storybook/react'
import 'app/styles/index.scss'


export const globalTypes = {
    scheme: {
        name: 'Theme',
        description: 'Select color theme',
        defaultValue: 'both',
        toolbar: {
            icon: 'mirror',
            items: [
                {value:'light', title: 'light', left:'☀️'}, 
                {value:'dark', title: 'dark', left:'🌚'}, 
                'all'],
            dynamicTitle: true
        }
    }
}
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
        TranslationDecorator,
        RouteDecorator,
        
    ],
}

export default preview


