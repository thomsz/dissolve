const fs = require('../services/file-system')
const path = require('../database/path')
const multer = require('multer')
const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()

router.post('/', (req, res) => {
  fs.read(path.tables.analytics, data => {
    try {
      const analytics = JSON.parse(data)
      const newLog = {
        ...req.body,
        id: uuid(),
        sessionId: req.headers['session-id']
      }

      analytics.push(newLog)
      const updatedAnalytics = JSON.stringify(analytics, null, 2)
      fs.write(path.tables.analytics, updatedAnalytics, () => {
        res.status(201).send(newLog)
      })
    } catch (error) {
      console.error(error)
    }
  })
})

module.exports = router
