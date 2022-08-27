const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {

        index: './src/index.js',
        
    
    
      },
      devServer: {

        static: './dist',
        hot: true,
    
      },
      plugins: [

        new MiniCssExtractPlugin({
          filename: 'banta.css',
        }),

        new HtmlWebpackPlugin({
    
          template: 'src/index.html'
    
        }),
    
      ],
  output: {
    filename: 'main.js',

    path: path.resolve(__dirname, 'dist'),
    clean: true,

  },
  // optimization: {
  //   runtimeChunk: 'single'
  // },
  module: {

    rules: [

      {

        test: /\.css$/i,

        use: [MiniCssExtractPlugin.loader,'css-loader'],

      },
      {

        test: /\.(png|svg|jpg|jpeg|gif)$/i,

        type: 'asset/resource',

      },
      {

        test: /\.(woff|woff2|eot|ttf|otf)$/i,

        type: 'asset/resource',

      },

    ],

  },
  
};