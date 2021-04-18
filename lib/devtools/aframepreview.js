var doneOnce = false
module.exports = function () {
  if (!doneOnce) {
    document.body.innerHTML += '<a-scene><a-sky color="#dfe"></a-sky><a-plane rotation="-90 0 0" color="#ccf" width="1000" height="1000"></a-plane></a-scene>'
    doneOnce = true
  }
  var scene = document.querySelector('a-scene')
  scene.innerHTML = ''
  var things = {}

  function getThing(thing) {
    var id = thing.id
    if (!things[id]) {
      things[id] = document.createElement('a-sphere')

      scene.appendChild(things[id])
    }
    things[id].setAttribute('radius', thing.attributes.r)
    return things[id]
  }

  var zero = getThing({ id: 'zerozero', attributes: { r: 0.1 } })
  zero.setAttribute('position', '0 0 0')
  zero.setAttribute('color', 'red')

  return function (thing, xyz) {
    var item = getThing(thing)
    item.setAttribute('position', xyz.join(' '))
  }
}