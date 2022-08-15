const express = require('express')
const router = express.Router()
const analyticsRouter = require('./analyticsRouter')
const contestantRouter = require('./contestantRouter')

router.use('/analytics', analyticsRouter)
router.use('/contestants', contestantRouter)
module.exports = router
