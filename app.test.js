const request = require('supertest');
const app = require('./app');
const should = require('should');

describe('api', function () {
    it('should return "Hello, world!" on GET /', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .expect(function (response) {
                response.text.toLowerCase().should.equal('Hello, world!'.toLowerCase())
            })
            .end(done);
    });

    it('should return ALL users on GET /users', function(done) {
        request(app)
            .get('/users')
            .expect(200)
            .expect(function (response) {
                response.body.should.be.an.Array();
            })
            .end(done);
    });

    // it('should return user by id on GET /users/:id', function(done) {
    //     request(app)
    //         .get('/users/5')
    //         .expect(200)
    //         .expect(function (response) {
    //             response.body.should.have.keys('name', 'age', 'id');
    //         })
    //         .end(done);
    // });

    it('should return user on POST /user', function(done) {
        request(app)
            .post('/users')
            .send({name: 'Ivan', age: 30})
            .expect(201)
            .expect(function (response) {
                response.body.should.have.keys('name', 'age', 'id');
            })
            .end(done);
    });
});