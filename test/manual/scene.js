function runScene () {
  var world = IIIdage.World({
    tickInterval: 200
  })

  var homer = IIIdage.Thing({
    is: ['homer'],
    sounds: {
      'a doh': {
        sound: 'doh',
        times: 1
      }
    },
    reacts: [
      {
        // to: world.random.veryOften(),
        to: world.random.aboutEveryMilisec(1000),
        with: 'a doh'
      }
    ]
  })

// scene should create and expose a default world or accept one
  var scene = IIIdage.Scene({
    title: 'Homer Simpson passing by',
    library: {
      sounds: {
        'doh': {
          src: ['../resources/doh.wav']
        }
      }
    },
    world: world,
    things: [ // scene iterates all things and spawns them into the world. same can be done manually later on.
      homer({
        pos: [50, 10, 10],
        dir: [-1, 0, 0],
        v: 1
      })
    ]
  // })
  }).load().run()

  setTimeout(function () {
    scene.dev.trace(IIIdage.dev.preview.dom())
  }, 500)

  window.scene = scene
  console.log('run scene.load() and then scene.run()')
}
