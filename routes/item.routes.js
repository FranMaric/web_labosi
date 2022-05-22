var express = require('express');
var { InventoryRepository } = require('../db/inventory_repository');
var router = express.Router();

router.get('/:id([0-9]{1,20})', async function(req, res, next) {
    let id = parseInt(req.params.id);
    let item = await InventoryRepository.getItem(id);

    if (item === null) {
        res.status(404).send(`There is no item with id ${id} :(`);
        return;
    }

    res.render('item', {
        title: item.name,
        linkActive: 'item',
        item: item,
    });
});

module.exports = router;