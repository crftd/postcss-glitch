/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const sourcePath = `${__dirname}/src`;
const staticsPath = `${__dirname}/dist`;

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const isRunningOnCi = process.env.CI || false;

const plugins = [
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({  // Also generate a test.html
    filename: 'test.html',
    base: 'postcss-glitch',
    template: './index.html'
  }),
  new MiniCssExtractPlugin({
    filename: isProd ? '[name].[hash].css' : '[name].css',
  })
];

if (!isRunningOnCi) plugins.push(new BundleAnalyzerPlugin());

const config = {
  devtool: isProd ? '' : 'eval-source-map',
  context: sourcePath,
  entry: {
    bundle: './index.js',
  },
  target: 'node',
  output: {
    path: staticsPath,
    filename: 'index.js',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.ts'],
    plugins: [ PnpWebpackPlugin ],
  },
  resolveLoader: {
    plugins: [ PnpWebpackPlugin.moduleLoader(module) ],
  },
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
    ],
  },
  plugins,
};

module.exports = config;
