var usersService = require('../services/users.service')
var expect = require('chai').expect;

describe('add two numbers', () => {
  it('should add two numbers', () => {
    var a = 4;
    var b = 6;
    var expected = a + b;

    var actual = usersService.testTesting(a, b);

    expect(actual).to.be.equal(expected);
  })
})
