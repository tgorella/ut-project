import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export function buildPlugins({paths, isDev}:BuildOptions): webpack.WebpackPluginInstance[] {
    const refreshPlugin = []

    if (isDev) {
      refreshPlugin.push(new ReactRefreshWebpackPlugin({overlay: false}))
  }

    const plugins = [
      new HtmlWebpackPlugin({
          template: paths.html
      }),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css'
      }),
      new webpack.DefinePlugin({
          ISDEV: JSON.stringify(isDev),
      }),
      ...refreshPlugin
  ]

if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(new BundleAnalyzerPlugin({
    openAnalyzer: false
}))
}
    
    return plugins
}