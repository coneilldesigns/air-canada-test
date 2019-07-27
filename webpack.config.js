const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].js',
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
      {
        test: /\.scss?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|ico)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'main.css',
      chunkFilename: 'test.css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: "./public/favicon-32x32.png"
    })],
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 5000,
    watchContentBase: true,
    compress: true,
    overlay: true
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://localhost:5000/api',
    }),
  },
};
