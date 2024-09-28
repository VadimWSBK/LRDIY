const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'web', // Ensure the target is set to 'web' for browser builds
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(), // Loads variables from .env file
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // Explicitly set NODE_ENV
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY), // Keep other needed variables
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser', // Polyfill for process
    }),
  ],
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all', // Enable code splitting
    },
  },
};
