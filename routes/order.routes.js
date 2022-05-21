var express = require('express');
var { InventoryRepository } = require('../db/inventory_repository');
var router = express.Router();

router.get('/', async function(req, res, next) {
    let categories = await InventoryRepository.getCategories();

    for (let i=0;i<categories.length;i++) {
        let items = await InventoryRepository.getItems(categories[i].id);
        categories[i].items = items;
    }

    res.render('order', {
        title: 'Order',
        linkActive: 'order',
        categories: categories
    });
});

module.exports = router;