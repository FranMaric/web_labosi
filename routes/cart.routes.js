const express = require('express');
const router = express.Router();
const cart = require('../models/CartModel')
const cartSanitizer = require('./helpers/cart-sanitizer');

// Ulančavanje funkcija međuopreme
router.get('/', cartSanitizer, function (req, res, next) {
    if (req.session.cart === undefined) {
        req.session.cart = cart.createCart();
    }

    res.render("cart", {
        title: 'Cart',
        user: req.session.user,
        cart: req.session.cart,
        linkActive: 'cart',
        err: undefined
    });
});


router.get('/add/:id', async function (req, res, next) {
    await cart.addItemToCart(req.session.cart, req.params.id, 1);
    res.status(200).send();
});

router.get('/remove/:id', async function (req, res, next) {
    await cart.removeItemFromCart(req.session.cart, req.params.id, 1);
    res.status(200).send();
});

module.exports = router;