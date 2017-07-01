var Ke = require('kefir')
var Howl = require('howler').Howl

//
// libraryDef = {
//     sounds: {
//         "hits": {
//             src: [],
//             sprite: optional,
//         },
//         "twit": {
//             src: []
//         }
//     },
//     tracks: {
//         //same but no 3D - for naration or background music.
//         // uses html5 audio tags and allows larger files.
//     }
// }
//

var _ = {
  soundDefaults: {
    preload: true
  },
  soundObject: require('./sound'),
  parseSoundName: function parseSoundName (name) {
    return name.split('.')
  },
  validateLibraryDefinition: function validateLibraryDefinition (libraryDefinition) {
    return true // TODO - throw nice descriptive errors when library is malformed
  },
  addLibraryDefaults: function addLibraryDefaults (libraryDefinition) {
    return Object.keys(libraryDefinition.sounds).reduce(function (library, soundName) {
      return library
    }, libraryDefinition)
  },
  preloadingProgressFromSources: function preloadingProgressFromSources (sources) {
    var count = sources.length

    return Ke.constant(sources)
      .flatten()
      .flatMap(function (soundInstance) {
        return Ke.stream(function (emitter) {
          if (soundInstance.state() === 'loaded') {
            emitter.emit(1)
            emitter.end()
          } else {
            soundInstance.once('loaderror', function (e) {
              emitter.error('Error loading sound "' + soundInstance.xsoundName + '" from ' + soundInstance._src)
              emitter.end()
            })
            soundInstance.once('load', function () {
              emitter.emit(1)
              emitter.end()
            })
          }
        })
        // fromCallback calls the function when a subscriber comes, might be too late
        // return Ke.fromCallback(soundInstance.on.bind(soundInstance, 'load'))
      })
      .takeErrors(1)
      .scan(function (accumulator) {
        accumulator++
        return accumulator
      }, 0)
      .map(function (i) {
        return i / count
      })
      .skipDuplicates()
      .takeWhile(function (progress) {
        return progress < 1
      })
  },
  preloadingProgressStream: function preloadingProgressStream (sounds) {
    var sources = Object.keys(sounds).map(function (soundName) {
      var tmpSoundInstance = new Howl(Object.assign({}, _.soundDefaults, sounds[soundName]))
      tmpSoundInstance.xsoundName = soundName
      if (tmpSoundInstance.state() !== 'loaded') {
        return tmpSoundInstance
      }
    }).filter(function (item) {
      return !!item
    })

    return _.preloadingProgressFromSources(sources)
  }
}

module.exports = function (libraryDefinition, options) {
  libraryDefinition = _.addLibraryDefaults(libraryDefinition)
  _.validateLibraryDefinition(libraryDefinition)

  return {
    getPlayingSound: function (name) {
      var soundNameTuple = _.parseSoundName(name) // oh how I'd love to ES6 the shit out of this with deconstruction
      var rawSound = new Howl(Object.assign({}, _.soundDefaults, {loop: true}, libraryDefinition.sounds[soundNameTuple[0]]))
      var soundId = rawSound.play(soundNameTuple[1])
      return _.soundObject(rawSound, soundId)
    },
    progress: _.preloadingProgressStream(libraryDefinition.sounds)
  }
}

module.exports._ = _
