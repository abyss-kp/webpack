const path = require('path') //webpack config file does not support ES6 so require is used instead of import
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: "./src/index.js",//webpack starts the bulid process from this file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, './dist'),
    // publicPath: 'dist/' since including index.html inside dist with HtmlWebpackPlugin now we dont need this prefix
  },
  mode: "development",
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
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
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
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({//cleans bundle before each build
      cleanOnceBeforeBuildPatterns: [
        '**/*',//This is default behaviour i.e /dist  if cleanOnceBeforeBuildPatterns is not configured
        path.join(process.cwd(), 'build/**/*') //to remove bundles from build folder i.e other than /dist folder
      ]
    }),
    new HtmlWebpackPlugin(//create index.html inside /dist folder
      {//customizing generated HTML files
        title: 'my file',
        filename: 'custom_filename.html',
        // filename: 'subfolder/custom_filename.html', // to create this file within a folder
        description: 'Some description',
        template: 'src/index.hbs'
      })
  ]
}