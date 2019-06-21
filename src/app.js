const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

// Create new express app
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// customize handlebars view templates location path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars envine and views location
app.set('view engine', 'hbs')
// needed for viewsPath
app.set('views', viewsPath)
// needed for partialsPath configuration
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// set server routes
// app.get expects two arguments request and response
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ron Gaza'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Weather App',
    name: 'Ron Gaza',
    image: '/img/scout-bobber.jpg'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'What can I help you with?'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      errorMessage: 'You must provide a address'
    })
  }
  // need to supply callback function for geoCode
  // set default lat,long,loc to empty object
  geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({error})
      }

      res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  })

  
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      errorMessage: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found'
  })
})

// start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000")
})