const fs = require('../services/file-system')
const path = require('../database/path')
const express = require('express')
const { v4: uuid } = require('uuid')

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

router.post('/', (req, res) => {
  fs.read(path.tables.contestants, data => {
    try {
      const contestants = JSON.parse(data)
      const newContestant = {
        ...req.body,
        id: uuid()
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
