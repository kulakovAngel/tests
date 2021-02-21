const delay = (time) => new Promise((res, rej) => setTimeout(() => res(1), time));

function multiply(a, b) {
    return a * b;
}

function makeUser(name = 'Guest', age) {
    return ({
        name,
        age: age,
    });
}

module.exports.multiply = multiply;
module.exports.makeUser = makeUser;