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

/**
 * Teste da rota: /GET
 */
describe('/GET planets', function() {
    it('Deve retornar todos os planets', function(done) {
        chai.request(server)
        .get('/starwars/planets')
        .end(function(error, res) {
          //Se tudo der certo deve retornar o status: 200 - OK
          res.should.have.status(200)
          //E em seguida retornar em um array todos os livros cadastrados na base de dados:
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
})

/**
 * Teste da rota: /POST
 */
describe('/POST planets', function() {
    it('Deve Criar um planets', function(done) {
        var livro = {
            titulo: "Javascript. O Guia Definitivo",
            autor: "David Flanagan",
            paginas:1080,
            ano: 2012
        }
        chai.request(server)
        .post('/starwars/planets')
        .send(livro)
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Livro adicionado com Sucesso!');
            res.body.livro.should.have.property('titulo');
            res.body.livro.should.have.property('autor');
            res.body.livro.should.have.property('paginas');
            res.body.livro.should.have.property('ano');
        done();
        });
    });
});
