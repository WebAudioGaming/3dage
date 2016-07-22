module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  output: {
    libraryTarget: 'umd',
    library: 'IIIdage',
    path: './dist',
    filename: '3dage.js'
  }
};
