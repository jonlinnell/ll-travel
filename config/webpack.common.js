const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { projectRoot } = require('./paths');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.join(projectRoot, 'src', 'client', 'app'),
  output: {
    path: path.join(projectRoot, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [
          path.resolve(projectRoot, 'src'),
        ],
        exclude: [
          path.resolve(projectRoot, 'node_modules'),
        ],
        loader: 'babel-loader',
        query: {
          presets: [
            ['@babel/env', {
              targets: {
                browsers: 'last 2 chrome versions',
              },
            }],
          ],
        },
      },
      {
        test: /.(jpg|png|eot|ttf|otf|woff|woff2)$/,
        loader: 'file-loader',
      },
      // {
      //   test: /\.svg(\?.*)?$/,
      //   loader: [
      //     'babel-loader',
      //     {
      //       loader: 'react-svg-loader',
      //       options: {
      //         jsx: true,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.scss'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new DefinePlugin({
      __CONFIG__: {
        API: JSON.stringify(process.env.API),
      },
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(projectRoot, 'src', 'client', 'index.html'),
      title: 'Chez Jorie!',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
  ],
};
