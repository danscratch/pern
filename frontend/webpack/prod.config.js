const webpack = require('webpack');
const baseConfig = require('./base.config.js');
const path = require('path');
const BUILD_DIR = path.normalize(path.resolve(__dirname, '..', 'build'));

module.exports = Object.assign({}, baseConfig, {
  output: {
    publicPath: '/',
    path: BUILD_DIR,
    filename: 'bundle-[chunkhash].js',
    chunkFilename: 'bundle-[chunkhash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    ...baseConfig.plugins,
  ],
});
