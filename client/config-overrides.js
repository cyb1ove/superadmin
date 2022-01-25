/* eslint-disable no-param-reassign */
const rewireAliases = require('react-app-rewire-aliases');
const path = require('path');

module.exports = {
  webpack(config, env) {
    config = rewireAliases.aliasesOptions({
      common: path.resolve(__dirname, '../common/types.d.ts'),
    })(config, env);

    return config;
  },
  paths(paths) {
    paths.appIndexJs = path.resolve(__dirname, 'index.tsx');
    paths.appSrc = path.resolve(__dirname, '../../');
    return paths;
  },
};
