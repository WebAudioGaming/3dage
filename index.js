module.exports = {
  '_': {
    library: require('./lib/sound/library'),
    renderer: require('./lib/sound/renderer')
  },
  Thing: require('./lib/thing'),
  World: require('./lib/world'),
  Kefir: require('kefir')
}
