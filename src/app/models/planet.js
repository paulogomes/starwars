const mongoose = require('../../database')

const PlanetSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  climate: {
    type: String,
    require: true,
  },
  terrain: {
    type: String,
    require: true,
  },
  films: {
    type: Number,
  },
})

const Planet = mongoose.model('Planet', PlanetSchema)

module.exports = Planet;
