var express = require('express');
var { InventoryRepository } = require('../db/inventory_repository');
var router = express.Router();

router.get('/:id', async function(req, res, next) {
    let id = parseInt(req.params.id);

    if(isNaN(id)) {
        res.status(404).send(`Item id must be number :(`);
        return;
    }

    let item = await InventoryRepository.getItem(id);

    if (item === null) {
        res.status(404).send(`There is no item with id ${id} :(`);
        return;
    }

    let partners = await InventoryRepository.getPartners(id);

    res.render('item', {
        title: item.name,
        linkActive: 'order',
        item: item,
        partners: partners,
    });
});

module.exports = router;