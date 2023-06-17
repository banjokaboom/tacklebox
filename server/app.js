import express from 'express'

import oilprices from './routes/oilprices.js'
import canifish from './routes/canifish.js'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(oilprices)
app.use(canifish)

app.listen(5555)
