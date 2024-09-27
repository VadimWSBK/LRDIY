// babel.config.js
module.exports = {
    presets: [
      // Include the necessary Babel presets
      ['@babel/preset-env', { targets: { node: 'current' } }],
      'next/babel', // This preset is specific for Next.js projects
    ],
  };
  