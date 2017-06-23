var Ke = require('kefir')
var Howl = require('howler').Howl

//
// libraryDef = {
//     sounds: {
//         "hits": {
//             src: [],
//             sprite: optional,
//             preload: false //set to false to override. defaults to true
//                 //'load' event needs to be used to track preloading stuff to the library
//                 //but before plugging into an event, check instance's .state() to see if it's not loaded
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
  soundObject: require('./sound'),
  parseSoundName: function parseSoundName (name) {
    return name.split('.')
  },
  validateLibraryDefinition: function validateLibraryDefinition (libraryDefinition) {
    return true // TODO - throw nice descriptive errors when library is malformed
  },
  addLibraryDefaults: function addLibraryDefaults (libraryDefinition) {
    return Object.keys(libraryDefinition.sounds).reduce(function (library, soundName) {
      if (typeof library.sounds[soundName].preload === 'undefined') {
        library.sounds[soundName].preload = true
      }
      return library
    }, libraryDefinition)
  },
  preloadingProgressFromSources: function preloadingProgressFromSources (sources) {
    var count = sources.length

    return Ke.constant(sources)
      .flatten()
      .flatMap(function (soundInstance) {
        // return Ke.stream(function (emitter) {
        //   if (soundInstance.state() === 'loaded') {
        //     emitter.emit(1)
        //     emitter.end()
        //   } else {
        //     soundInstance.once('loaderror', function (e) {
        //       emitter.error('Error loading sound')
        //     })
        //     soundInstance.once('load', function () {
        //       emitter.emit(1)
        //       emitter.end()
        //     })
        //   }
        // })
        // fromCallback calls the function when a subscriber comes, might be too late
        return Ke.fromCallback(soundInstance.on.bind(soundInstance, 'load'))
      })
      .scan(function (accumulator) {
        accumulator++
        return accumulator
      }, 0)
      .map(function (i) {
        return i / count
      })
      .takeWhile(function (progress) {
        return progress < 1
      })
  },
  preloadingProgressStream: function preloadingProgressStream (sounds) {
    var sources = Object.keys(sounds).map(function (soundName) {
      var tmpSoundInstance = new Howl(sounds[soundName])
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
      var rawSound = new Howl(Object.assign({loop: true}, libraryDefinition.sounds[soundNameTuple[0]]))
      var soundId = rawSound.play(soundNameTuple[1])
      return _.soundObject(rawSound, soundId)
    },
    progress: _.preloadingProgressStream(libraryDefinition.sounds)
  }
}

module.exports._ = _
