const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
});
