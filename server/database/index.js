const fs = require('fs')
const path = require('./path')

module.exports = {
  seed: () => {
    fs.readFile(path.seed.contestants, (error, data) => {
      if (error) {
        console.error('[readFile]', error)
        return
      }

      fs.writeFile(path.tables.contestants, data, { flag: 'wx' }, error => {
        if (error && error.code === 'EEXIST') {
          error = null
        }
      })
    })
  }
}
