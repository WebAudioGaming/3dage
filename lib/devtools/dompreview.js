module.exports = function () {
  var cache = {}
  var offsetx = ~~(window.innerWidth / 2)
  var offsety = ~~(window.innerHeight / 2)
  var d = document.createElement('div')
  d.style.position = 'absolute'
  d.style.width = d.style.height = '2px'
  d.style.background = 'red'
  d.style.left = offsetx + 'px'
  d.style.top = offsety + 'px'
  document.body.appendChild(d)
  return function (thing, xyz) {
    if (!cache[thing.id]) {
      var i = cache[thing.id] = document.createElement('input')
      i.style.position = 'absolute'
      i.setAttribute('type', 'radio')
      document.body.appendChild(i)
    }
    cache[thing.id].style.left = -10 * xyz[0] + offsetx + 'px'
    cache[thing.id].style.top = -10 * xyz[2] + offsety + 'px'
  }
}
