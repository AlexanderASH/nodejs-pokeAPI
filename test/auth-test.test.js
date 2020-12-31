
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../server').app;

describe('Suite de pruebas auth', () => {
    it('should return 401 when no jwt token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/team')
            .end((err, res) => {
                chai.assert.equal(res.status, 401);
                done();
            }
        );
    });

    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                chai.assert.equal(res.status, 400);
                done();
            }
        );
    });

    it('should return 200 and token for succesful login', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({user: 'pcua', password: 'root2020'})
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                done();
            }
        );
    });

    it('should return 200 when jwt is valid', (done) => {
        chai.request(app)
            .post('/login')
            .set('Content-type', 'application/json')
            .send({user: 'pcua', password: 'root2020'})
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.request(app)
                    .get('/team')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.status, 200);
                        done();
                    }
                );
            }
        );
    });
});