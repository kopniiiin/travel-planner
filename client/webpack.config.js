const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const styleLoaders = [
  {loader: MiniCssExtractPlugin.loader},
  {loader: 'css-loader'},
  {loader: 'postcss-loader', options: {postcssOptions: {plugins: [autoprefixer]}}},
  {loader: 'sass-loader'},
];

const scriptLoaders = [{loader: 'ts-loader'}];

module.exports = {
  entry: './source/index.tsx',
  output: {filename: 'bundle.js', path: path.join(__dirname, 'build')},
  devServer: {contentBase: path.join(__dirname, 'build'), port: 4444, open: true},
  resolve: {extensions: ['.js', '.ts', '.tsx']},
  plugins: [
    new HtmlWebpackPlugin({template: 'source/index.html', inject: false}),
    new MiniCssExtractPlugin({filename: 'bundle.css'}),
  ],
  module: {
    rules: [
      {test: /\.scss$/, use: styleLoaders},
      {test: /\.(ts|tsx)$/, exclude: /node_modules/, use: scriptLoaders},
    ],
  },
};
