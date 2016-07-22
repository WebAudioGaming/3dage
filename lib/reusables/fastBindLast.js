module.exports = function fastBindLast (obj, addition) {
  return {
    any: function wrapArgs (name) {
      return function () {
        var args = [].slice.call(arguments)
        args.push(addition)
        return obj[name].apply(obj, args)
      }
    },
    0: function wrapArg0 (name) {
      return function () {
        return obj[name].call(obj, addition)
      }
    },
    1: function wrapArg1 (name) {
      return function (a) {
        return obj[name].call(obj, a, addition)
      }
    },
    2: function wrapArg2 (name) {
      return function (a, b) {
        return obj[name].call(obj, a, b, addition)
      }
    },
    3: function wrapArg3 (name) {
      return function (a, b, c) {
        return obj[name].call(obj, a, b, c, addition)
      }
    }
  }
}
