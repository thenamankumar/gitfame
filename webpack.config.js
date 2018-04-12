const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'app');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const ASSETS_DIR = path.join(APP_DIR, 'assets');

const config = {
  entry: ['babel-polyfill', `${APP_DIR}/index.jsx`],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: [/node_modules/, ASSETS_DIR],
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }],
        }),
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.svg$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&interlaced=false',
        ],
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './env/dev.env',
    }),
    new ExtractTextPlugin('bundle.css'),
    new CopyWebpackPlugin([
      {
        from: `${PUBLIC_DIR}/**/*`,
        to: BUILD_DIR,
      },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: BUILD_DIR,
    watchContentBase: true,
    historyApiFallback: true,
    port: 4000,
    hot: true,
  },
};

module.exports = config;
