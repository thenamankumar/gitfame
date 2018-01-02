const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');
const ASSETS_DIR = path.resolve(__dirname, 'src/app/assets');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loaders: ['babel-loader?presets[]=react,presets[]=react'],
      },
      {
        test: /\.s?css$/,
        include: APP_DIR,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loaders: ['eslint-loader'],
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './env/prod.env',
    }),
    new CleanWebpackPlugin(BUILD_DIR),
    new PreloadWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: `${PUBLIC_DIR}/**/*`,
        to: BUILD_DIR,
      },
    ]),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: true,
      minimize: false,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
