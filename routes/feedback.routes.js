const express = require('express');
const router = express.Router();
const helper = require('./helpers/helper');
const Order = require('../models/OrderModel')
const Address = require('../models/AddressModel')
const authHandler = require('./helpers/auth-handler');

router.get('/',authHandler,  function (req, res, next) {


    res.render("view", {
        title: 'Customer Feedback',
        user: req.session.user,
        cart: req.session.cart,
        linkActive: 'cart',
        err: undefined,
        helper: new helper(req.session.feedback),
    });
});

router.post('/save-and-return',  function (req, res, next) {
    req.session.feedback = req.body;

    res.redirect('/cart');
});

router.post('/', authHandler, function (req, res, next) {
    req.session.feedback = {};

    res.render("view", {
        title: 'Customer Feedback',
        user: req.session.user,
        cart: req.session.cart,
        linkActive: 'cart',
        err: undefined,
        helper: new helper(req.session.feedback),
    });
});

router.post('/order', async function (req, res, next) {
    try {
        res.redirect('/checkout');
    } catch {
        res.render("view", {
            title: 'Customer Feedback',
            user: req.session.user,
            cart: req.session.cart,
            linkActive: 'cart',
            err: 'Something went wrong',
            helper: new helper(),
        });
    }
});

module.exports = router;