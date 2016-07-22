var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: [
      'mocha!./test/automated/index.js'
  ],
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: 'test.js',
    publicPath: '/'
},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080/test/automated/test.html', browser: 'chromium-browser' })
  ]
};
