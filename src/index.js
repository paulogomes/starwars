const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

require('./app/controllers/index')(app)

let server = app.listen(3000, () => { console.log('May the force be with you!') })

module.exports = server
