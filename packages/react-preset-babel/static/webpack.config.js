const CleanWebpackPLugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        loader: 'sass-loader',
        enforce: 'pre',
        options: {
          sourceMap: true
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /assets|node_modules/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: isProd ? '[hash:base64:8]' : '[local]--[hash:base64:8]',
              camelCase: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(scss|sass|css)$/,
        include: /assets|node_modules/,
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
      fix: true
    }),
    ...(isProd ? [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css',
        chunkFilename: 'css/[name].[id].[hash:8].css'
      })
    ] : [])
  ]
}
