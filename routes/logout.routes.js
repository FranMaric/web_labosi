const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    req.session.cart = undefined;
    req.session.user = undefined;
    req.session.feedback = {};
    res.redirect('/');
});

module.exports = router;