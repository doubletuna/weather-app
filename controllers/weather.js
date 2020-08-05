const fetch = require('node-fetch');

const accuweatherService = require('../services/accuweather');

const moment = require('moment')

exports.getWeatherForecastByKey = async (req, res, next) => {
  const key = req.params.key;
  // console.log('key ? ', key)
  if (!key) {
    res.status(401).send('no key provided...')
  }
  try {
    // find relevant weather from today
    const forecastExists = await accuweatherService.findForecast(key)

    if (forecastExists && forecastExists.length > 0 && moment().isSame(moment(forecastExists[0].updatedAt), 'date') ) {
      res.status(200).send({ data: forecastExists[0].forecastData, db: true })
    } else {
      console.log('access accuweather API..')
      // gmail
      const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.ACCUWEATHER_API_KEY1}&details=true&metric=true`, { method: 'GET' })
      // hotmail
      // const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.ACCUWEATHER_API_KEY2}&details=true&metric=true`, { method: 'GET' })

      if (response.Code == 'ServiceUnavailable') {
        res.status(response.status).send({ message: response.Message })
      }
      const weather = await response.json()

      const saveLocationList = await accuweatherService.saveForecast(key, weather)

      console.log('fetch weather success')
      res.status(200).send({ data: weather })
    }
  }
  catch (error) {
    res.status(500).send('problem with server ?? ')
  }
}
