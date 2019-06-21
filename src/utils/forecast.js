
const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/3ba972e46013b72040fcc0109e99eb7a/' + latitude + ',' + longitude
  
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
      callback('Error: Unable to find location. Please try another.', undefined)
    } else {
      const currently = body.currently
      const forecast = body.daily.data[0].summary
      callback(undefined, `${forecast} It is currently ${currently.temperature} degrees out. There is ${currently.precipProbability}% chance of rain.`, )
    }
  })
}


module.exports = forecast