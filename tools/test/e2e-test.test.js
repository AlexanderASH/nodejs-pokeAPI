
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../server').app;

describe('Suite de prueba e2e', () => {
    it('should return Hello World', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                chai.assert.equal(res.text, 'Hello World');
                //Soluciona problemas de asyncronia, avisamos cuando termina el test
                done();
            }
        );
    });
});