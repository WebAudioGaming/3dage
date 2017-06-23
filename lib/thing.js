var R = require('ramda')
var Ke = require('kefir')
var vNormalize = require('vectors/normalize')(3)
var vMultiply = require('vectors/mult')(3)
var vAdd = require('vectors/add')(3)

// internal defaults that simplify things and let people skip some bits of definitions
var secretDefaults = {
  defaults: {
    pos: [0, 0, 0],
    dir: vNormalize([0, 1, 0]),
    v: 0
  },
  is: ['thing'],
  reacts: [],
  sounds: {},
  functions: {}
}

var _ = {
  positionUpdater: function positionUpdater (instance) {
    return function () {
      if (instance.attributes.v > 0) {
        instance.attributes.pos = vAdd(instance.attributes.pos, vMultiply(instance.attributes.dir, instance.attributes.v))
      }
    }
  },
  createReaction: function createReaction (reaction) {
    if (reaction.call) {
      return reaction.call(this)
    }
    // reminder: "to" is an observable
    return reaction.to.map(function (input) {
      if (typeof reaction.with === 'string') {
        return reaction.with
      } else {
        return reaction.with.call(this, input)
      }
    })
  },
  createSoundStream: function createSoundStream (definition) {
    return Ke.constant(definition.reacts)
      .flatten()
      .flatMap(_.createReaction.bind(this))
      .map(function (sound) {
        return definition.sounds[sound]
      })
  },
  mixInReducer: function mixInReducer (definition, mixedDefinition) {
    definition.is = [].concat(definition.is || [], mixedDefinition.is || [])
    definition.reacts = [].concat(definition.reacts || [], mixedDefinition.reacts || [])
    definition.defaults = R.merge(definition.defaults, mixedDefinition.defaults)
    definition.sounds = R.merge(definition.sounds, mixedDefinition.sounds)
    definition.functions = Object.assign(definition.functions, mixedDefinition.functions)
    return definition
  },
  ThingPrototype: {
    destroy: function () {
      this.attributes = null
    }
  }
}

function Thing () {
  var definition = [].slice.call(arguments).reduce(_.mixInReducer, secretDefaults)
  var proto = Object.assign(Object.create(_.ThingPrototype), definition.functions, {
    // TODO: make defaults readonly by freezing the field
    defaults: R.clone(definition.defaults)
  })
  return {
    spawn: function spawn (world, attributes) {
      // TODO: with some minor work this part could be compatible with instanceof
      var instance = Object.create(proto)
      instance.attributes = R.merge(definition.defaults, attributes)

      instance.sound = _.createSoundStream.call(instance, definition)
      // TODO: ability to make sound keep going while its event is being emitted every tick and stop when it stops

      instance.position = world.tick
        .takeWhile(function () {
          return !!instance.attributes
        })
        .filter(function () {
          return instance.attributes.v > 0
        })
        .map(function () {
          instance.attributes.pos = vAdd(instance.attributes.pos, vMultiply(instance.attributes.dir, instance.attributes.v))
          return instance.attributes.pos
        })
      return instance
    }
  }
}

Thing._ = _

module.exports = Thing
