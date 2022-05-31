const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    // TODO - obrisati sadržaj košarice
    req.session.user = undefined
    res.redirect('/');
});

module.exports = router;