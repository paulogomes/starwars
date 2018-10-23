const express = require('express')
const request = require('request-promise')
const Planet = require('../models/planet')
const router = express.Router()

router.get('/', (req, res) => {
  const { name } = req.query

  if (name) {
    Planet.findOne({ name }, (err, planet) => {
      if (err) return res.status(400).send({ error: 'Planet not found.' })
      else return res.send({ planet })
    })
  }
  else {
    Planet.find({}, (err, planets) => { res.send(planets) })
  }

})

router.get('/:id', (req, res) => {

  Planet.findOne({_id: req.params.id}, (err, planet) => {
    if (err) return res.status(400).send({ error: 'Planet not found.' })
    else return res.send({ planet })
  })

})

router.post('/', (req, res) => {

  const { name, climate, terrain } = req.body

  let planet = new Planet({ name, climate, terrain })

  // Obtém quantidade de filmes
  request({ method: 'GET', uri: 'https://swapi.co/api/planets/' })
  .then( (response) => {

    let planetAPI = JSON.parse(response).results.filter( (el) => { return el.name == name })

    if (planetAPI.length > 0) planet.films = planetAPI[0].films.length

    planet.save( (err) => {
      if (err) return res.status(400).send({ error: 'Planet creation failed: ' + err })
      else return res.send({ planet })
    })

  })

})

router.delete('/:id', (req, res) => {

  Planet.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(400).send({ error: 'Planet not found.' })
    else return res.send({ result: 'Planet was deleted' })
  })

})

module.exports = app => app.use('/starwars/planets', router)
