const path = require('path');

module.exports = {
  lintOnSave: 'error',
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      alias: {
        App: path.resolve(__dirname, 'src/app/'),
        Arch: path.resolve(__dirname, 'src/app/arch/'),
        Assets: path.resolve(__dirname, 'src/assets/'),
        Domain: path.resolve(__dirname, 'src/domain/'),
        Plugins: path.resolve(__dirname, 'src/plugins/'),
        '@test': path.resolve(__dirname, 'tests/unit/'),
      },
    },
  },
};
