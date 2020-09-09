require('dotenv').config()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

const mongoose = require('mongoose')

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

require('./routes/index')(app);

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
  