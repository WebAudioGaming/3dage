// this is just for early ideas of what a scene definition would look like
var fly = annoyingFly({
  pos: [-1, -15, 0],
  dir: [0, 0, 0],
  v: 0.1
})
// scene should create and expose a default world or accept one
var scene = IIIdage.Scene({
  title: 'Annoying fly',
  library: {
    sounds: {
      'buzz': {
        src: ['./buzzing.mp3']
      },
      'burn': {
        src: ['./lampburn.mp3']
      }
    }
  },
  world: world,
  things: [ // scene iterates all things and spawns them into the world. same can be done manually later on.
    fly
  ]
}).load().run()

//not good :()
world.time.on({
  120/*seconds*/: fly.do(burn).remove()
})

scene.things // array of spawned things
