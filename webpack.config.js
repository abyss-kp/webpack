const path = require('path') //webpack config file does not support ES6 so require is used instead of import
const TerserPlugin = require('terser-webpack-plugin') //reduces the size of the bundle
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
module.exports = {
  entry: "./src/index.js",//webpack starts the bulid process from this file
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/'
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader','css-loader' //style-loader creates <style> tag and 
          //  css-loader loades css ... execution is from left to right
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader','sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties']
          }
        }
      }
    ]
  },
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin({//bundles css into a separate file
      filename: 'styles.[contenthash].css'
    })
  ]
}