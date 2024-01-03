import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from '../loaders/buildCssLoaders'
import { buildBabelLoader } from '../loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {

    const babelLoader = buildBabelLoader(options.isDev)

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