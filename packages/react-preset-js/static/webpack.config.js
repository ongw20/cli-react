const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const gitRepoInfo = require('git-repo-info')

const info = gitRepoInfo()

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: [
    'core-js',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isProd ? 'js/[name].[chunkhash:7].js' : 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:7].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        loader: 'less-loader',
        enforce: 'pre',
        options: {
          sourceMap: !isProd,
          javascriptEnabled: true,
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProd,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(ttf|woff|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/font/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'public',
      to: './',
      ignore: ['index.html'],
    }]),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      hash: false,
      meta: {
        version: require('./package.json').version,
        build: `${info.branch}-${info.abbreviatedSha.substr(0, 7)}`,
      },
    }),
    ...(isProd ? [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:7].css',
        chunkFilename: 'css/[name].[id].[hash:7].css',
      }),
    ] : []),
  ],
  devServer: {
    https: false,
    port: 8080,
  },
}
