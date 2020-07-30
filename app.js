const path = require('path')
const express = require('express')
const app = express()

const publicPath = path.join(__dirname, '..', 'public')

require('dotenv').config()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const locationRoutes = require('./routes/location')
const weatherRoutes = require('./routes/weather')
app.use(locationRoutes)
app.use(weatherRoutes)
app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`running at port ${port}`)
})
