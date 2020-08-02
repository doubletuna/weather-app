const fetch = require('node-fetch')

exports.getLocation = async (req, res, next) => {
  const location = req.params.location;

  if (location.length < 3) {
    res.status(401).send('location parameter too short...')
  }
  try {
    // gmail
    const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=NYJhk1cGkGybYGo18S8Zc9kMiF8Jrcqq&q=${location}`, { method: 'GET' })

    // hotmail
    // const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=yweoRSUGDOVX8Ke0S0Gv3ANX09okxr0F&q=${location}`, { method: 'GET' })
    if (response.Code == 'ServiceUnavailable') {
      res.status(response.status).send({ message: response.Message })
    }
    const locationList = await response.json()
    // console.log('locationList ? ', locationList)
    console.log('fetch locationList success')
    res.status(200).send({ data: locationList })
  } catch (error) {
    res.status(500).send('problem with server ?? ')
  }
}

