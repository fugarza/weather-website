const request = require('request')

// high and low temp
//

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/3ba972e46013b72040fcc0109e99eb7a/' + latitude + ',' + longitude
  
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
      callback('Error: Unable to find location. Please try another.', undefined)
    } else {
      
      const currently = body.currently
      const summary = body.daily.summary
      const highTemp = body.daily.data[0].temperatureHigh
      const forecast = `${summary} 
        It is currently ${currently.temperature} degrees out. 
        Temperature high for the day is ${highTemp}.
        Chance of rain is ${currently.precipProbability}%.`
      
      callback(undefined, forecast)
    }
  })
}


module.exports = forecast