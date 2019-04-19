const path = require('path')
const CleanWebpackPLugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')

module.exports = (hashLen) => ({
  output: {
    path: path.join(process.env.CONTEXT, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: `assets/img/[name].[hash:${hashLen}].[ext]`
        }
      },
      {
        test: /\.(ttf|woff|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: `assets/font/[name].[hash:${hashLen}].[ext]`
        }
      }
    ]
  },
  plugins: [
    new WebpackBar(),
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
    })
  ],
  devServer: {
    https: false,
    host: '0.0.0.0',
    port: 8080,
    hotOnly: false,
    hot: true,
    quiet: true,
    clientLogLevel: 'none',
    historyApiFallback: true
  }
})
