const path = require('path');

module.exports = {
  entry: './pages/index.tsx', // Update this path based on your main calculator entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'caravan-calculator.bundle.js',
    library: 'CaravanCalculatorWidget', // This should match the global object name
    libraryTarget: 'umd', // Use UMD to make it compatible with various module systems
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/, // Use .module.css for CSS modules
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: 'production', // Use 'development' for easier debugging
};