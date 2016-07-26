const webpack = require('webpack');
const baseConfig = require('./base.config.js');

module.exports = Object.assign({}, baseConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
