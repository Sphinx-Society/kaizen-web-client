const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `
                    @import "${resolve(__dirname, 'src/client/styles/index.scss')}";
                `,
            },
          },
        ],
      },
      {
        test: /\.(png|gif|jpg|jpeg|webp|ttf|eot|woff|woff2|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[hash].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html'),
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json'),
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dist/js/*.dll.js'),
      outputPath: 'js',
      publicPath: '/js',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/app.*'],
    }),
    new webpack.EnvironmentPlugin([...Object.keys(process.env)]),
  ],
};
