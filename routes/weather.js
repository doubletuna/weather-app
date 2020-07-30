const path = require('path')

const express = require('express')

const router = express.Router()

const weatherController = require('../controllers/weather')

router.get('/weather/:key', weatherController.getWeatherForecastByKey)

module.exports = router