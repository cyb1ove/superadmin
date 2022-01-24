/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  paths(paths) {
    paths.appIndexJs = path.resolve(__dirname, 'index.tsx');
    paths.appSrc = path.resolve(__dirname, '');
    return paths;
  },
};
