const express = require('express');
const router = express.Router();
const passport = require('passport');

// Llamamos a la funcuin de auth.js
require('../auth')(passport);

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res) => {
        res.status(200).send('Hello World');
    })
    .put((req, res) => {
        res.status(200).send('Hello World');
    });

router.route('/pokemons')
    .post((req, res) => {
        res.status(200).send('Hello World');
    });

router.route('/pokemons/:pokeid')
    .delete((req, res) => {
        res.status(200).send('Hello World');
    });

exports.router = router;
