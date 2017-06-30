var Ke = require('kefir')

var _ = {
  applyPos: function applyPos (sound, pos) {
    sound.pos(pos[0], pos[1], pos[2])
    // TODO: stop the sound if position stream ends
  },
  trackPosition: function trackPosition (soundStream, positionStream) {
    return Ke.combine([soundStream, positionStream], function (sound, pos) {
      return {
        sound: sound,
        pos: pos
      }
    })
    .spy('combined')
    .takeWhile(function (pair) {
      return !!pair.sound
    })
    .observe(function (pair) {
      _.applyPos(pair.sound, pair.pos)
    })
  },
  soundFactory: function soundFactory (library, soundSpec, startingPos) {
    console.log('soundFactory')
    return Ke.stream(function (emitter) {
      var count = soundSpec.times || 1
      var finishedPlaybacks = 0
      var sound = library.getPlayingSound(soundSpec.sound)
      _.applyPos(sound, startingPos)
      emitter.emit(sound)
      if (count < Infinity) {
        sound.on('end', function () {
          finishedPlaybacks++
          if (finishedPlaybacks >= count) {
            sound.stop()
            emitter.emit(null)
            emitter.end()
          }
        })
      }
    })
  }

}

module.exports = {
  render: function (source, library) {
    Ke.combine([source.sound], [source.position])
    .observe({
      value: function (combination) {
        var soundSpec = combination[0]
        var recentPos = combination[1]
        var soundStream = _.soundFactory(library, soundSpec, recentPos)
        _.trackPosition(soundStream.spy('S'), source.position.spy('P'))
      }
    })
  },
  '_': _
}
