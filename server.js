var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')

var locationRoutes = require('./src/routes/locationRoutes')

const databaseConfig = require('./config/database')
const databaseURI = databaseConfig.database

mongoose.connect(databaseURI, function(err, response) {
  if(err) {
    console.log('ERROR: Failed to connect to ' + databaseURI + ': ' + err)
  } else {
    console.log('SUCCESS: Connected to ' + databaseURI)
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(morgan('dev'))

app.use('/location', locationRoutes)

var port = 8080

app.listen(port, function() {
  console.log('Travel Guide listening on port: ' + port);
})
