const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../server').app;

const userController = require('../../auth/users.controller');
const teamController = require('../teams.controller');

// Se ejecuta antes de cada describe
before((done) => {
    userController.registerUser('pcua', 'root2020');
    userController.registerUser('wendy', 'root2020');
    done();
});

// Se ejecuta despues de cada It
afterEach((done) => {
    teamController.cleanUpTeam();
    done();
});

describe('Suite de prueba teams',() => {
    it('should return the team of the given user', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}, {name: 'Pikachu'}];
        chai.request(app)
            .post('/auth/login')
            .set('Content-type', 'application/json')
            .send({user: 'pcua', password: 'root2020'})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.status, 200);
                chai.request(app)
                    .put('/teams')
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // Tiene equipo con Charizar y Blastoise
                                // { trainer: 'pcua', team: [pokemons]}
                                chai.assert.equal(res.status, 200);
                                chai.assert.equal(res.body.trainer, 'pcua');
                                chai.assert.equal(res.body.team.length, team.length);
                                chai.assert.equal(res.body.team[0].name, team[0].name);
                                chai.assert.equal(res.body.team[1].name, team[1].name);
                                done();
                            }
                        );
                    }
                );
            }
        );
    });
    it('should return the pokedex number', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let pokemonName = 'Bulbasaur';
        chai.request(app)
            .post('/auth/login')
            .set('Content-type', 'application/json')
            .send({user: 'pcua', password: 'root2020'})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.status, 200);
                chai.request(app)
                    .post('/teams/pokemons')
                    .send({name: pokemonName})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // Tiene equipo con Charizar y Blastoise
                                // { trainer: 'pcua', team: [pokemons]}
                                chai.assert.equal(res.status, 200);
                                chai.assert.equal(res.body.trainer, 'pcua');
                                chai.assert.equal(res.body.team.length, 1);
                                chai.assert.equal(res.body.team[0].name, pokemonName);
                                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                done();
                            }
                        );
                    }
                );
            }
        );
    });
    it('should return the pokedex number', (done) => {
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}, {name: 'Pikachu'}];
        chai.request(app)
            .post('/auth/login')
            .set('Content-type', 'application/json')
            .send({user: 'pcua', password: 'root2020'})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.status, 200);
                chai.request(app)
                    .put('/teams')
                    .send({team: team})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .delete('/teams/pokemons/1')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.request(app)
                                    .get('/teams')
                                    .set('Authorization', `JWT ${token}`)
                                    .end((err, res) => {
                                        // Tiene equipo con Charizar y Blastoise
                                        // { trainer: 'pcua', team: [pokemons]}
                                        chai.assert.equal(res.status, 200);
                                        chai.assert.equal(res.body.trainer, 'pcua');
                                        chai.assert.equal(res.body.team.length, team.length - 1);
                                        done();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });
});

// Se ejecuta despues de un describe
after((done) => {
    userController.cleanUpUsers();
    done();
});