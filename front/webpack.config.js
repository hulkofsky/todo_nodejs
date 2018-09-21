const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/js/index.js',
    './src/sass/main.sass'
  ],

  output: {
    filename: './js/bundle.js'
  },

  devtool: "source-map",

  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env',
            sourceMap: true
          }
        }
      },
      {
        
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/sass'),
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true,
                url: false
              }
            },
            {
            loader: "postcss-loader",
                options: {
                    sourceMap: true
                }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            },
          ]
        })
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/'),
        use: [
            {
                loader: "html-loader",
                options: { minimize: true }
            }
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
        filename: './css/style.bundle.css',
        allChunks: true,
      }),
    new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
    }),
  ]
};