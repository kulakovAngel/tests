const {multiply, makeUser} = require('./app');
const assert = require('assert');
const should = require('should');

describe('Test operation multiply', function () {

    it('6*8 should be 48', function () {
        if (multiply(6, 8) !== 48) {
            throw new Error('It not be 48');
        }
    });

    it('should be a*b', function () {
        for (let a=0; a<=100; a++) {
            for (let b=0; b<=100; b++) {

                const res = multiply(a, b);
                if (res !== a*b) {
                    throw new Error(`It not be ${a}*${b}===${a*b}, but: ${res}`);
                }
            }
        }
    });

});


describe('Test makeUser function', function () {

    const name = 'Ivan';
    const age = 30;
    const user = makeUser(name, age);

    it('should be Object', function () {
        user.should.be.a.Object;
    });

    it('should be User Object with fields Name(String) & Age(Number)', function () {
        user.should.have.property('name').which.is.a.String();
        user.should.have.property('age').which.is.a.Number();
    });

    it('should be User Object equal name & age', function () {
        assert.deepEqual(user, {name, age});
    });

    it('should be User Object with name: Guest, if undefined', function () {
        const user = makeUser(undefined, age);
        assert.deepEqual(user, {name: 'Guest', age});
    });
});