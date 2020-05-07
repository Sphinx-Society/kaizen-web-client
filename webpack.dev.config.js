const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: resolve(__dirname, 'src/client/index.js'),
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: 'http://localhost:8080/',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(s*)css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `
                    @import "${resolve(__dirname, 'src/client/styles/index.scss')}";
                `,
            },
          },
          'resolve-url-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.jpg|png|gif|woff|woff2|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html'),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ],
      },
    }),
  ],
};
