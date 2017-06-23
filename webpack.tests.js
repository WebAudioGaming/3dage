var path = require('path')

module.exports = {
  entry: [
    './test/automated/index.js'
  ],
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'testbuild.js'
  },
  node: {
    fs: 'empty'
  }
}
