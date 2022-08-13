const fs = require('fs')

module.exports = {
  read: (path, callback) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        console.error(error)
        res.sendStatus(500)
      }
  
      callback && callback(data)
    })
  },
  write: (path, data, callback) => {
    fs.writeFile(path, data, error => {
      if (error) {
        console.error(error)
        res.sendStatus(500)
      }
  
      callback && callback()
    })
  }
}
