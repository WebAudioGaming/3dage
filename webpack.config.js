var path = require('path')
module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  output: {
    libraryTarget: 'umd',
    library: 'IIIdage',
    path: path.resolve(__dirname, './dist'),
    filename: '3dage.js'
  }
}
