const mongoose = require('mongoose')

const Schema = mongoose.Schema

const forecastSchema = new Schema(
  {
    key: {
      type: String,
      required: true
    },
    forecastData: Schema.Types.Mixed
  },
  { timestamps: true }
)

module.exports = mongoose.model('Forecast', forecastSchema)