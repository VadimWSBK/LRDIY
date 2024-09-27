const path = require('path');

module.exports = {
  entry: './pages/index.tsx', // Update this path based on your main calculator entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'caravan-calculator.bundle.js',
    library: 'CaravanCalculatorWidget',
    libraryTarget: 'umd', // This makes the bundle compatible with various module systems
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i, // Matches any .css file
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS files
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: 'production', // Set this to 'production' or 'development'
};