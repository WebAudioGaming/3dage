var fs = require('fs')
module.exports = function (req, res) {
  if (req.url === '/mock/doh.wav') {
    res.statusCode = 200
    fs.createReadStream(__dirname + '/doh.wav').pipe(res)
  }
}
