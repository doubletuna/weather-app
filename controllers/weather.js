const fetch = require('node-fetch')

exports.getWeatherForecastByKey = async (req, res, next) => {
  const key = req.params.key;
  // console.log('key ? ', key)
  if (!key) {
    res.status(401).send('no key provided...')
  }
  try {
    // gmail
    // const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=NYJhk1cGkGybYGo18S8Zc9kMiF8Jrcqq&details=true&metric=true`, { method: 'GET' })
    // hotmail
    const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=yweoRSUGDOVX8Ke0S0Gv3ANX09okxr0F&details=true&metric=true`, { method: 'GET' })

    if (response.Code == 'ServiceUnavailable') {
      res.status(response.status).send({ message: response.Message })
    }
    const weather = await response.json()
    // console.log('weather ? ', weather)
    console.log('fetch weather success', weather)
    res.status(200).send({ data: weather })
  }
  catch (error) {
    res.status(500).send('problem with server ?? ')
  }
}
