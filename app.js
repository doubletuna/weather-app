const path = require('path')
const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const locationRoutes = require('./routes/location')
const weatherRoutes = require('./routes/weather')
app.use(locationRoutes)
app.use(weatherRoutes)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

mongoose.connect(process.env.DBURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(result => {
    console.log('mongo connected! ');
    app.listen(port, () => {
      console.log(`running at port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  })

  