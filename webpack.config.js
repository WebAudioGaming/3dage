var path = require('path')
module.exports = {
  entry: {
    '3dage': './index.js',
    '3dage-dev': './tools.js'
  },
  devtool: 'source-map',
  output: {
    libraryTarget: 'umd',
    library: 'IIIdage',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  }
}
