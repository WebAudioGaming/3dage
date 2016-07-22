// incomplete
var dog = Thing({
  attributes: {
    r: 1,
    v: 0.1,
    dir: [],
    pos: []
  },
  sounds: {
    'default': {
      sound: ['bark', 'bark2'],
      times: 2
    },
    'bark': {
      sound: 'bark3',
      times: 1
    },
    'default_action': {
      sound: 'bark3',
      times: 1
    }
  },
  reacts: [
    {
      to: world.random.rarely(), // can replace with a getter to remove parents :>
      with: 'bark'
    },
    {
      to: player.position,
      with: function (input, emit) {}
    }
  ]

})

dog.mixIn(colliding)
dog.mixIn(following)
