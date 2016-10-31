var webpack = require('webpack');

module.exports = {
  entry: [
      './test/automated/index.js'
  ],
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: '.',
    filename: 'testbuild.js'
    },
    node: {
      fs: "empty"
    }
};
