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
    source.sound.observe(function (soundSpec) {
      var soundStream = source.position.take(1).flatMap(_.soundFactory.bind(null, library, soundSpec))
      _.trackPosition(soundStream.spy('sSt'), source.position)
    })
  },
  '_': _
}
