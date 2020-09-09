const fetch = require('node-fetch')

const accuweatherService = require('../services/accuweather');

exports.getLocation = async (req, res, next) => {
  const location = req.params.location;

  if (location.length < 3) {
    res.status(401).send('location parameter too short...')
  }
  try {

    const locationListExists = await accuweatherService.findLocation(location)

    if (locationListExists && locationListExists.length > 0) {

      res.status(200).send({ data: locationListExists[0].locationData, db: true })
    } else {
      console.log('access accuweather API..')

      const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.ACCUWEATHER_API_KEY1}&q=${location}`, { method: 'GET' })

      if (response.Code == 'ServiceUnavailable') {
        res.status(response.status).send({ message: response.Message })
      }
      const locationList = await response.json()

      await accuweatherService.saveLocation(location, locationList)

      console.log('fetch locationList success')
      res.status(200).send({ data: locationList })
    }
  } catch (error) {
    res.status(500).send('problem with server ?? ')
  }
}

