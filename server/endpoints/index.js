const express = require('express')
const router = express.Router()
const contestantRouter = require('./contestantRouter')

router.use('/contestants', contestantRouter)
module.exports = router
