const path = require('path')
const CleanWebpackPLugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  module: {
    entry: './src/index.jsx',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[chunkhash:8].js' : 'js/[name].js',
      chunkFilename: 'js/[name].[chunkhash:8].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
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
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(ttf|woff|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/font/[name].[hash:8].[ext]'
        }
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
  ],
  devServer: {
    https: false,
    port: 8080
  }
}
