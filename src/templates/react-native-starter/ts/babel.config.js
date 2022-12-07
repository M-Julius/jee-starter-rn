module.exports = api => {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          rootPathPrefix: '~',
        },
      ],
      ['inline-dotenv'],
      ['react-native-reanimated/plugin'],
    ],
  };
};

