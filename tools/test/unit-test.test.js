
const assert = require('chai').assert;

function addValue(a, b){
    return a + b;
}

describe('Suite de prueba', () => {
    it('should return 2', () => {
        let value = addValue(1, 1);
        assert.equal(value, 2);
    });
});