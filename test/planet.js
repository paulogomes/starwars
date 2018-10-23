const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const should = chai.should()

chai.use(chaiHttp);

describe('Planets', function() {

  it('should add a SINGLE planet on /starwars/planets POST', (done) => {
    chai.request(server)
    .post('/starwars/planets')
    .send({ 'name': 'Coruscant', 'climate': 'temperate', 'terrain': 'cityscape, mountains' })
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('SUCCESS')
      res.body.SUCCESS.should.be.a('object')
      
      res.body.SUCCESS.should.have.property('_id')
      res.body.SUCCESS.should.have.property('name')
      res.body.SUCCESS.should.have.property('climate')
      res.body.SUCCESS.should.have.property('terrain')
      res.body.SUCCESS.should.have.property('films')


      res.body.SUCCESS.name.should.equal('Coruscant')
      res.body.SUCCESS.climate.should.equal('temperate')
      res.body.SUCCESS.terrain.should.equal('cityscape, mountains')
      res.body.SUCCESS.films.should.equal('4')
      
      done()
    })
  })

  it('should list ALL planets on /starwars/planets GET', (done) => {
    chai.request(server)
    .get('/starwars/planets')
    .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        res.body.length.should.be.eql(1)
        done();
    })
  })

  it('should list a SINGLE planet by Id on /starwars/planets/<Id> GET', (done) => {
    chai.request(server)
    .get('/starwars/planets/')
    .end(function(err, res){
      chai.request(server)
      .get('/starwars/planets/'+res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200)

        res.body.SUCCESS.should.have.property('_id')
        res.body.SUCCESS.should.have.property('name')
        res.body.SUCCESS.should.have.property('climate')
        res.body.SUCCESS.should.have.property('terrain')
        res.body.SUCCESS.should.have.property('films')


        res.body.SUCCESS.name.should.equal('Coruscant')
        res.body.SUCCESS.climate.should.equal('temperate')
        res.body.SUCCESS.terrain.should.equal('cityscape, mountains')
        res.body.SUCCESS.films.should.equal('4')

        done()
      })
    })
  })

  it('should list a SINGLE planet by Name on /starwars/planets/?name=<Name> GET', (done) => {
    chai.request(server)
    .get('/starwars/planets/')
    .end(function(err, res){
      chai.request(server)
      .get('/starwars/planets/?name='+res.body[0].name)
      .end(function(error, response){
        response.should.have.status(200)

        res.body.SUCCESS.should.have.property('_id')
        res.body.SUCCESS.should.have.property('name')
        res.body.SUCCESS.should.have.property('climate')
        res.body.SUCCESS.should.have.property('terrain')
        res.body.SUCCESS.should.have.property('films')


        res.body.SUCCESS.name.should.equal('Coruscant')
        res.body.SUCCESS.climate.should.equal('temperate')
        res.body.SUCCESS.terrain.should.equal('cityscape, mountains')
        res.body.SUCCESS.films.should.equal('4')

        done()
      })
    })
  })

  it('should delete a SINGLE planet on /starwars/planets/<Id> DELETE', (done) => {
    chai.request(server)
    .get('/starwars/planets/')
    .end(function(err, res){
      chai.request(server)
        .delete('/starwars/planets/'+res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200)
          done()
      })
    })
  })

})
