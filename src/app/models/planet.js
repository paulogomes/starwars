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

// Obtém quantidade de filmes
PlanetSchema.pre('save', async function(next) {

  request({ method: 'GET', uri: 'https://swapi.co/api/planets/' })
  .then( (response) => {

    let planetAPI = JSON.parse(response).results.filter( (el) => { return el.name == this.name })

    if (planetAPI.length > 0) this.films = planetAPI[0].films.length

    next()
  })  

})

const Planet = mongoose.model('Planet', PlanetSchema)

module.exports = Planet;
