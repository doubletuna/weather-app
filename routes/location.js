const path = require('path')

const express = require('express')

const router = express.Router()

const locationController = require('../controllers/location')

router.get('/location/:location', locationController.getLocation)

module.exports = router