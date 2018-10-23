const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const should = chai.should()

chai.use(chaiHttp);

describe('Planets', function() {
  it('should add a SINGLE planet on /starwars/planets POST');

  it('should list ALL planets on /starwars/planets GET', (done) => {
    chai.request(server)
        .get('/starwars/planets')
        .end(function(err, res){
            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.a('array')
            res.body.length.should.be.eql(0)
            done();
        })
  })

  it('should list a SINGLE planet by Id on /starwars/planets/<Id> GET');
  it('should list a SINGLE planet by Name on /starwars/planets/?name=<Name> GET')
  it('should delete a SINGLE planet on /starwars/planets/<Id> DELETE');
});

