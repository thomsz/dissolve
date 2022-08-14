require('dotenv').config()
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const router = require('./endpoints')
const database = require('./database')

const app = express()
const port = process.env.PORT || 3000

database.seed()
app.use(cors())
app.use(bodyParser.json())
app.use('/api', router)
app.use('/uploads', express.static('uploads'))
app.listen(port, () => console.log(`Listening on port ${port}`))
