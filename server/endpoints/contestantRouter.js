const fs = require('../services/file-system')
const path = require('../database/path')
const multer = require('multer')
const express = require('express')
const { v4: uuid } = require('uuid')

const storage = multer.diskStorage({
  filename: (_, file, callback) => {
    const FILE_EXTENSION = '.jpg'
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
    callback(null, file.fieldname + uniqueSuffix + FILE_EXTENSION)
  },
  destination: (_, __, callback) => {
    callback(null, 'uploads/')
  }
})

const upload = multer({ storage })
const router = express.Router()

router.get('/', (_, res) => {
  fs.read(path.tables.contestants, data => {
    try {
      const contestants = JSON.parse(data)
      res.send(contestants)
    } catch (error) {
      console.error(error)
    }
  })
})

router.post('/', upload.single('profileImage'), (req, res) => {
  fs.read(path.tables.contestants, data => {
    try {
      const contestants = JSON.parse(data)
      const newContestant = {
        ...req.body,
        id: uuid(),
        profileImage: `${fs.BASE_URL}/${req.file.path}`
      }

      contestants.push(newContestant)
      const updatedContestants = JSON.stringify(contestants, null, 2)
      fs.write(path.tables.contestants, updatedContestants, () => {
        res.status(201).send(newContestant)
      })
    } catch (error) {
      console.error(error)
    }
  })
})

module.exports = router
