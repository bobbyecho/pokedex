module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@themes': './src/themes',
          '@src': './src',
          '@features': './src/features',
          '@helpers': './src/helpers',
          '@models': './src/models',
          '@navigations': './src/navigations',
          '@assets': ['./src/assets'],
        },
      },
    ],
  ],
};
