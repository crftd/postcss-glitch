const webpack = require('webpack');

const sourcePath = `${__dirname}/src`;
const staticsPath = `${__dirname}/dist`;
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const config = {
  devtool: isProd ? 'source-map' : 'eval-source-map',
  context: sourcePath,
  entry: {
    bundle: './index.js',
  },
  target: 'node',
  output: {
    path: staticsPath,
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      `${__dirname}/node_modules`,
      sourcePath,
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: sourcePath,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-0'],
        },
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = config;
