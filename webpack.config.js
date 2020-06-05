'use strict'
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NODE_ENV = process.env.NODE_ENV;
const setPath = function (folderName) {
  return path.join(__dirname, folderName);
};
const isProd = function () {
  return (process.env.NODE_ENV === 'production') ? true : false;
};
module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: "all", //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    }
  },
  resolveLoader: {
    modules: [setPath('node_modules')]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  //entry: ['@babel/polyfill', './src/main.js'],
  entry: './src/index.ts',
  module: {
    rules: [
      //   {
      //     test: /\.js$/,
      //     exclude: /node_modules/,
      //     use: [{
      //       loader: "babel-loader",
      //       options: { presets: ["@babel/preset-env"] }
      //     }]
      //   },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            }
          },
          // {
          //   loader: "style-loader" // creates style nodes from JS strings
          // },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'cui-light.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new MiniCssExtractPlugin({
      filename: 'cui-light.styles.css'
    })
  ]
};