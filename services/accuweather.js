const Forecast = require('../models/forecast')
const Location = require('../models/location')

exports.findLocation = async (location) => {
  return await Location.find({ str: location })
}

exports.saveLocation = async (location, locationData) => {
  console.log('saveLocation service.. .')
  const locationExists = await this.findLocation(location)
  if (locationExists && locationExists.length > 0) {
    console.log('locationExists, updating.. .')
    locationExists[0].locationData = locationData
    return locationExists[0].save()
      .catch(err => console.log('saveLocation error ', err))
  } else {
    console.log('new location, inserting.. .')
    const doc = { str: location, locationData: locationData }
    return Location.create(doc)
      .catch(err => console.log('create Location error ', err))
  }
}

exports.findForecast = async (key) => {
  return await Forecast.find({ key: key })
}

exports.saveForecast = async (key, forecastData) => {
  const forecastExists = await this.findForecast(key)

  if (forecastExists && forecastExists.length > 0) {
    forecastExists[0].forecastData = forecastData
    return forecastExists[0].save()
      .catch(err => console.log('saveForecast error ', err))
  } else {
    const doc = { key: key, forecastData: forecastData }
    return Forecast.create(doc)
      .catch(err => console.log('create Forecast error ', err))
  }
}