require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
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
    // root: [path.join(__dirname, 'node_modules'), __dirname],
    extensions: ['', '.js', '.json', '.jsx'],
    // modulesDirectories: ['node_modules', '.'],
    // alias: {
    //   styles: `${APP_DIR}/styles`,
    // },
  },
};

module.exports = config;
