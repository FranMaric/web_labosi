const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')


router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Login',
        user: req.session.user,
        linkActive: 'login',
        err: undefined
    });
});

router.post('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //postupak prijave korisnika

    //#######################################################

});


module.exports = router;