/* eslint-disable @typescript-eslint/no-var-requires */
const CleanWebpackPLugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          'ts-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        loader: 'less-loader',
        enforce: 'pre',
        options: {
          sourceMap: true
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPLugin(),
    new CopyWebpackPlugin([{
      from: 'public',
      to: './',
      ignore: ['index.html']
    }]),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: false
    }),
    new StyleLintWebpackPlugin({
      fix: true,
      files: 'src/**/*.less'
    }),
    ...(isProd ? [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css',
        chunkFilename: 'css/[name].[id].[hash:8].css'
      })
    ] : [])
  ]
}
