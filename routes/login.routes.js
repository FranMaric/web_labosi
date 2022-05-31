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

router.post('/', async function (req, res, next) {
    console.log(req.body);
    let user = await User.fetchByUsername(req.body.user);

    if (user === undefined) {
        res.render('login', {
            title: 'Login',
            user: req.session.user,
            linkActive: 'login',
            err: 'No user with that username'
        });
        return;
    } else if (user.checkPassword(req.body.password)) {
        req.session.user = user;
        res.redirect('/');
    }

    res.render('login', {
        title: 'Login',
        user: req.session.user,
        linkActive: 'login',
        err: 'Invalid credentials'
    });
    return;

});


module.exports = router;