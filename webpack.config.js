/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const sourcePath = `${__dirname}/src`;
const staticsPath = `${__dirname}/dist`;

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const isRunningOnCi = process.env.CI || false;

const plugins = [new webpack.NamedModulesPlugin()];

if (!isRunningOnCi) plugins.push(new BundleAnalyzerPlugin());

const config = {
  devtool: isProd ? '' : 'eval-source-map',
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
    modules: [`${__dirname}/node_modules`, sourcePath],
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
  plugins,
};

module.exports = config;
