/* eslint-disable i18next/no-literal-string */
module.exports = {
    'settings': {
        'react': {
            'createClass': 'createReactClass', // Regex for Component Factory to use,
            'pragma': 'React',  // Pragma to use, default to "React"
            'version': 'detect', // React version. "detect" automatically picks the version you have installed.
        },},
    'env': {
        'browser': true,
        'es2021': true,
        'jest': true
    },
    'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:i18next/recommended', 'plugin:storybook/recommended'],
    'globals': {
        __API__: true,
        __PROJECT__: true

    },
    'overrides': [
        {
            'rules': {
                'i18next/no-literal-string': 'off',
                'complexity': ['error', {max: 50}]
            },
            'env': {
                'node': true
            },
            'files': [
                '**/src/**/*.test.{ts,tsx}',
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'react', 
        'i18next',
        'react-hooks',
        'watcher-plugin'
    ],
    'rules': {
        'react/jsx-indent': [
            2,4
        ],
        'react/jsx-indent-props': [
            2,4
        ],
        'indent': [
            'error',
            4
        ],
        'react/jsx-filename-extension':[2, {extensions: ['.js', '.jsx','.tsx']}],
        'linebreak-style': 0,
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-unused-vars': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'i18next/no-literal-string': ['error', { markupOnly: true, ignoreAttribute: ['data-testid', 'to', 'name', 'as', 'direction', 'justify', 'align', 'gap', 'mobile', 'folder', 'alt', 'role', 'previewSide']}],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        'react/display-name': 'off',
        'watcher-plugin/patch-checker': 'error'
    }
}
