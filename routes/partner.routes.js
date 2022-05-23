var express = require('express');
var { InventoryRepository } = require('../db/inventory_repository');
const { query } = require("../db/index");
var router = express.Router();

router.get('/', async function(req, res, next) {
    let partners = await InventoryRepository.getAllPartners();

    res.render('partners', {
        title: 'Partners',
        linkActive: 'partners',
        partners: partners,
    });
});

router.get('/create-partner', async function(req, res, next) {
    let itemId = parseInt(req.query.item);
    let items = await InventoryRepository.getAllItems();

    let locals = {};
    locals.selectData = {};
    locals.selectData.list = items;

    res.render('create-partner', {
        title: 'Partners',
        linkActive: 'partners',
        locals: locals,
        itemID: itemId,
    });
});

router.post('/create-partner', async function(req, res, next) {
    // try {
        if (!req.body.email.includes('@')) {
            res.status(400).send('Invalid email');
        }

        if (isNaN(parseInt(req.body.partnerSince))) {
            res.status(400).send('Partner since must be a number');
        }
        await query(`insert into partners (name, owner_name, owner_surname, email, partnersince, partnerfor) values ('${req.body.name}', '${req.body.ownerName}', '${req.body.ownerSurname}', '${req.body.email}', '${req.body.partnerSince}', '${req.body.selectId}')`);
        // await InventoryRepository.createNewPartner(req.body.name, req.body.ownerName, req.body.ownerSurname, req.body.email, req.body.partnerSince, req.body.selectId);

        res.status(200).send('Partner created successfully');
    // } catch {
    //     res.status(400).send('Unknown error happend');
    // }
});

module.exports = router;