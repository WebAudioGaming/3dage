// this is just for early ideas of what a scene definition would look like

// scene should create and expose a default world or accept one
var scene = IIIdage.Scene({
  library: {
    //sound library definition
  },
  world: IIIdage.World({
    settings
  }),
  things: [ // scene iterates all things and spawns them into the world. same can be done manually later on.
    dog({
      x: 1,
      y: 1,
      z: 1
    })
  ]
}).spawn()

scene.things // array of spawned things
