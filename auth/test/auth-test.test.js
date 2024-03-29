
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const userController = require('../users.controller');
const teamsController = require('../../teams/teams.controller');

const app = require('../../server').app;

beforeEach(async () => {
    await userController.registerUser('pcua', 'root2020');
    // await userController.registerUser('wendy', 'root2020');
});

afterEach(async () => {
    await userController.cleanUpUsers();
    await teamsController.cleanUpTeam();
});

describe('Suite de pruebas auth', () => {
    it('should return 401 when no jwt token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/teams')
            .end((err, res) => {
                chai.assert.equal(res.status, 401);
                done();
            }
        );
    });

    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                chai.assert.equal(res.status, 400);
                done();
            }
        );
    });

    it('should return 200 and token for succesful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('Content-type', 'application/json')
            .send({user: 'pcua', password: 'root2020'})
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                done();
            }
        );
    });

    it('should return 200 when jwt is valid', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('Content-type', 'application/json')
            .send({user: 'pcua', password: 'root2020'})
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.request(app)
                    .get('/teams')
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

// after((done) => {
//     userController.cleanUpUsers();
//     done();
// });