/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');

const sourcePath = `${__dirname}/src`;
const staticsPath = `${__dirname}/dist`;

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const config = {
  devtool: isProd ? 'source-map' : 'eval-source-map',
  context: sourcePath,
  entry: {
    bundle: './index.ts',
  },
  target: 'node',
  output: {
    path: staticsPath,
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      `${__dirname}/node_modules`,
      sourcePath,
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: sourcePath,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = config;
