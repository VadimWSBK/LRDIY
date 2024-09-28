const path = require('path');
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
    // Define process.env for the browser
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // or 'development'
      'process.browser': JSON.stringify(true),
      'process.env': JSON.stringify({}), // To handle other process.env references
    }),
  ],
  mode: 'production', // or 'development'
};
