var request = require('supertest');
var chai = require('chai');
// var chaiHttp = require('chai-http');
chai.should();
// chai.use(chaiHttp);

describe('Articles Controller', function() {

  describe('#index', function() {
    it('should get articles when access to /index', function (done) {
      request(sails.hooks.http.app)
        .get('/index')
        .end( (err, res) => {
            res.body.should.be.a('array');
            res.body.length.should.be.eql(14);
            done();
      });
    });
  });

  describe('#edit', function() {
    it('should get articles when access to /edit', function (done) {
      let id = '59e3928b2abea0ba7d1dd052';
      request(sails.hooks.http.app)
        .get('/edit/'+id)
        .end( (err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('article');
            res.body.article.should.have.property('id').eql(id);
            res.body.article.should.have.property('title');
            res.body.article.should.have.property('body');
            done();
    });
    });
  });
  describe('#update', function() {
    it('should get new article when we update an article', function (done) {
      let id = '59e3928b2abea0ba7d1dd052';
      let data = {
          title : 'xin chao Viet Nam',
          body : 'Hello Viet Nam'
      };
      request(sails.hooks.http.app)
        .post('/update/'+id)
        .send(data)
        .end( (err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('article');
            res.body.article.should.have.property('id').eql(id);
            res.body.article.should.have.property('title');
            res.body.article.should.have.property('body');
            done();
    });
    });
  });
  xdescribe('#store', function() {
    it('should get new article when we create a new article', function (done) {
      let data = {
          title : 'xin chao Viet Nam',
          body : 'Hello Viet Nam'
      };
      request(sails.hooks.http.app)
        .post('/store')
        .send(data)
        .end( (err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('article');
            res.body.article.should.have.property('id');
            res.body.article.should.have.property('title').eql(data.title);
            res.body.article.should.have.property('body').eql(data.body);
            done();
    });
    });
  });
  describe('#delete', () => {
    it('should get a message delete successfully',  (done) => {
      let id = '59e42b14f0be8a843c1ce97a';
      request(sails.hooks.http.app)
        .get('/delete/'+id)
        .end( (err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Delete Successfully');
            done();
    });
    });
  });
});
