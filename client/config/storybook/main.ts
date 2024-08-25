import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        'storybook-addon-apollo-client',
        '@storybook/addon-webpack5-compiler-swc',
        '@chromatic-com/storybook'
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {
            builder: {
                useSWC: true
            }
        }
    },
    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic'
                }
            }
        }
    }),
    docs: {},
}
export default config
