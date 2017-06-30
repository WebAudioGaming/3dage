function runScene () {
  var world = IIIdage.World({
    tickInterval: 200
  })

  var something = IIIdage.Thing({
    is: ['some'],
    sounds: {
      'a': {
        sound: 'hits',
        times: 3
      }
    },
    reacts: [
      {
        to: world.random.often(),
        with: 'a'
      }
    ]
  })

// scene should create and expose a default world or accept one
  var scene = IIIdage.Scene({
    library: {
      sounds: {
        'hits': {
          src: ['../resources/uu.mp3']
        }
      }
    },
    world: world,
    things: [ // scene iterates all things and spawns them into the world. same can be done manually later on.
      something({
        x: 1,
        y: 1,
        z: 1
      })
    ]
  })

  window.scene = scene
  console.log('run scene.load() and then scene.run()')
}
