const path = require('path');
const merge = require('webpack-merge');

const { projectRoot } = require('./paths');

const common = require('./webpack.common');

module.exports = merge(common, {
  entry: ['react-hot-loader/patch', common.entry],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(projectRoot, 'dist'),
    hot: true,
    historyApiFallback: true,
  },
});
