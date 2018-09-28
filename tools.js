var main = require('./index')
main.dev = {
  preview: {
    dom: require('./lib/devtools/dompreview'),
    aframe: require('./lib/devtools/aframepreview')
  }
}
module.exports = main
