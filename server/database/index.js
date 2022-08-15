const fs = require('fs')
const path = require('./path')

const seed = (resource) => {
  fs.readFile(path.seed[resource], (error, data) => {
    if (error) {
      console.error('[readFile]', error)
      return
    }

    fs.writeFile(path.tables[resource], data, { flag: 'wx' }, error => {
      if (error && error.code === 'EEXIST') {
        error = null
      }
    })
  })
}

module.exports = {
  seed: () => ['analytics', 'contestants'].forEach(resource => seed(resource))
}
