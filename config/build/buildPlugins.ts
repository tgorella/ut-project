import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

function buildPlugins({paths}:BuildOptions): webpack.WebpackPluginInstance[] {
  return [new HtmlWebpackPlugin({
    title: 'Page via template',
    template: paths.html
  }),
  new webpack.ProgressPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8].css'
  })
];
}
 
export default buildPlugins;