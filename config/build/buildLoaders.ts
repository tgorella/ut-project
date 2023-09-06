import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from '../loaders/buildCssLoaders'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {

    const babelLoader = {
        test: /\.m?(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                'plugins': [
                    ['i18next-extract', {
                        locales: ['ru', 'en'],
                        keyAsDefaultValue: true
                    }],
                ]
            }
        }
    }

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|webp|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    const typescriptLoader =  {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const cssLoader = buildCssLoader(options.isDev)
  
    return [
        fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader
    ]
}