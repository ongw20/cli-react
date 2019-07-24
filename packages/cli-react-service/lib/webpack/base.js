const path = require('path')
const WebpackBar = require('webpackbar')

module.exports = (hashLen) => ({
  entry: './src/index.js',
  output: {
    path: path.join(process.env.CONTEXT, 'dist'),
    filename: 'js/[name].js',
    chunkFilename: `js/[name].[chunkhash:${hashLen}].js`,
    publicPath: '/'
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
          {
            loader: 'babel-loader',
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
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
    new WebpackBar()
  ],
  devServer: {
    https: false,
    host: '0.0.0.0',
    port: 8080,
    hotOnly: false,
    hot: true,
    quiet: true,
    clientLogLevel: 'error',
    overlay: {
      warnings: false,
      errors: false
    },
    historyApiFallback: true
  }
})
