const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const Planet = require('../src/app/models/planet')
const should = chai.should()

chai.use(chaiHttp);

describe('Planets', function() {

  before(function() {
      Planet.deleteMany({}, (err) => { if (err) console.log(err) })
  })

  it('should add a SINGLE planet on /starwars/planets POST', (done) => {
    chai.request(server)
    .post('/starwars/planets')
    .send({ 'name': 'Coruscant', 'climate': 'temperate', 'terrain': 'cityscape, mountains' })
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('planet')
      res.body.planet.should.be.a('object')

      res.body.planet.should.have.property('_id')
      res.body.planet.should.have.property('name')
      res.body.planet.should.have.property('climate')
      res.body.planet.should.have.property('terrain')
      res.body.planet.should.have.property('films')


      res.body.planet.name.should.equal('Coruscant')
      res.body.planet.climate.should.equal('temperate')
      res.body.planet.terrain.should.equal('cityscape, mountains')
      res.body.planet.films.should.equal(4)

      done()
    })
  })

  it('should list ALL planets on /starwars/planets GET', (done) => {
    chai.request(server)
    .get('/starwars/planets')
    .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('planets')
        res.body.planets.should.be.a('array')
        res.body.planets.length.should.be.eql(1)
        done()
    })
  })

  it('should list a SINGLE planet by Id on /starwars/planets/<Id> GET', (done) => {
    chai.request(server)
    .get('/starwars/planets/')
    .end(function(err, res){
      chai.request(server)
      .get('/starwars/planets/'+res.body.planets[0]._id)
      .end(function(error, response){
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('planet')
        response.body.planet.should.be.a('object')

        response.body.planet.should.have.property('_id')
        response.body.planet.should.have.property('name')
        response.body.planet.should.have.property('climate')
        response.body.planet.should.have.property('terrain')
        response.body.planet.should.have.property('films')


        response.body.planet.name.should.equal('Coruscant')
        response.body.planet.climate.should.equal('temperate')
        response.body.planet.terrain.should.equal('cityscape, mountains')
        response.body.planet.films.should.equal(4)

        done()
      })
    })
  })

  it('should list a SINGLE planet by Name on /starwars/planets/?name=<Name> GET', (done) => {
    chai.request(server)
    .get('/starwars/planets/')
    .end(function(err, res){
      chai.request(server)
      .get('/starwars/planets/?name='+res.body.planets[0].name)
      .end(function(error, response){
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('planet')
        response.body.planet.should.be.a('object')

        response.body.planet.should.have.property('_id')
        response.body.planet.should.have.property('name')
        response.body.planet.should.have.property('climate')
        response.body.planet.should.have.property('terrain')
        response.body.planet.should.have.property('films')


        response.body.planet.name.should.equal('Coruscant')
        response.body.planet.climate.should.equal('temperate')
        response.body.planet.terrain.should.equal('cityscape, mountains')
        response.body.planet.films.should.equal(4)

        done()
      })
    })
  })

  it('should delete a SINGLE planet on /starwars/planets/<Id> DELETE', (done) => {
    chai.request(server)
    .get('/starwars/planets/')
    .end(function(err, res){
      chai.request(server)
        .delete('/starwars/planets/'+res.body.planets[0]._id)
        .end(function(error, response){
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('result')
          response.body.result.should.be.a('string')

          response.body.result.should.equal('Planet was deleted')
          done()
      })
    })
  })

})
