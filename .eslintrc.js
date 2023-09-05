module.exports = {
    'settings': {
        'react': {
            'createClass': 'createReactClass', // Regex for Component Factory to use,
            'pragma': 'React',  // Pragma to use, default to "React"
            'version': 'detect', // React version. "detect" automatically picks the version you have installed.
        },},
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
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
        'react'
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
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
    }
}
