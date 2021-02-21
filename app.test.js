const request = require('supertest');
const app = require('./app');

describe('api', function () {
    it('should return "Hello, world!" on GET /', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .expect('Hello, world!')
            .end(done);
    });

    it('should return user on GET /user', function(done) {
        request(app)
            .get('/user')
            .expect(200)
            .expect(function (response) {
                //todo: add should library
                require('asset').deepEqual(
                    response.body,
                    {
                        name: 'Ivan',
                        age: 18,
                    }
                )
            })
            .end(done);
    });
});