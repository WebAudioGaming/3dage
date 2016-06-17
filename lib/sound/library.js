var Rx = require('rx')
var Howl = require('howler')
var soundObject = require('./sound')

libraryDef = {
    sounds: {
        "hits": {
            src: [],
            sprite: optional,
            preload: true //I will have to force preload on those
                //'load' event needs to be used to track preloading stuff to the library
                //but before plugging into an event, check instance's .state() to see if it's not loaded
        },
        "twit": {
            src: []
        }
    },
    tracks: {
        //same but no 3D - for naration or background music.
        // uses html5 audio tags and allows larger files.
    }
}

options = {
    preloadingProgress: function() {},
    preloadingFinished: function() {}
}

module.exports = function(libraryDefinition, options) {
    validateLibraryDefinition(libraryDefinition)

    return {
        getPlayingSound: function(name) {
            var soundNameTuple = parseSoundName(name) //oh how I'd love to ES6 the shit out of this with deconstruction
            var rawSound = new Howl(libraryDefinition.sounds[soundNameTuple[0]])
            var soundId = rawSound.play(soundNameTuple[1])
            return soundObject(rawSound, soundId)
        },
        progress: preloadingProgressStream(libraryDefinition.sounds),
        _parseSoundName: parseSoundName,
        _validateLibraryDefinition: validateLibraryDefinition,
        _monitorPreloadingProgress: monitorPreloadingProgress
    }
}

function parseSoundName(name) {
    return name.split('.')
}

function validateLibraryDefinition(libraryDefinition) {
    return true; //TODO - throw nice descriptive errors when library is malformed
}

function preloadingProgressStream(sounds) {

    var sources = sounds.map(function(soundDef){
        var tmpSoundInstance = new Howl(soundDef)
        if (tmpSoundInstance.state() !== 'loaded') {
            return Rx.Observable.fromEvent(tmpSoundInstance,'load')
        }
    }).filter(function(item){return !!item});
    var count = sources.length;

    return sources
        .scan(function(accumulator) {
            return accumulator++
        })
        .map(function(i) {
            return i / count
        })
        .takeWhile(function(progress) {
            progress < 1
        })
}
