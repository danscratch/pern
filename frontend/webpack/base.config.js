
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

const BUILD_DIR = path.normalize(path.resolve(__dirname, '..', 'build'));
const APP_DIR = path.normalize(path.resolve(__dirname, '..', 'src'));

module.exports = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    publicPath: '/',
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
  },
  plugins: [
    new ManifestPlugin({ fileName: 'build-manifest.json' }),
  ],
};
