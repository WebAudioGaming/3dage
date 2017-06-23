// incomplete
var tree = Thing({
  defaults: {
    r: 1,
    v: 0
  },
  sounds: {
    'onaction': {
      sound: 'knock',
      times: 2
    },
    'leaves': {
      sound: ['leaves_long', 'leaves2'],
      times: 1
    }
  },
  reacts: [
    {
      to: world.wind(), // can replace with a getter to remove parents :>
      with: 'leaves'
    }
  ]

}, colliding)
