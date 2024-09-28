const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Corrected entry path
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/', // Correct publicPath
    library: 'CaravanCalculator',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== "undefined" ? self : this',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      MainCalculator: path.resolve(__dirname, 'src/MainCalculator'),
      components: path.resolve(__dirname, 'src/components'),
      store: path.resolve(__dirname, 'src/store'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      publicPath: '/dist/',
    }),
  ],
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve from dist folder
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
};
