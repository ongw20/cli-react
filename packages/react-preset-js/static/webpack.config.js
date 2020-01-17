const CleanWebpackPLugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  module: {
    rules: [
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
    ...(isProd ? [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css',
        chunkFilename: 'css/[name].[id].[hash:8].css'
      })
    ] : [])
  ]
}