var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Multiplicateur = require('../controllers/multiplicateur.controller');

router.get('/', async (req,res) => {
    try {
        multi = await Multiplicateur.getAll();
        res.status(201).send(multi);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id',async(req,res) => {
    try {
        multi = await Multiplicateur.getOne();
        res.status(201).send(multi);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

/* SAVE PRODUCT */

router.post('/',async (req,res)=> {
    try {
        multi = await Multiplicateur.addMulti(req);
        res.status(201).send(multi);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


/* UPDATE PRODUCT */

router.put('/:id',async (req)=> {
    try {
        multi = await Multiplicateur.updateMulti(req);
        res.status(201).send(multi);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


/* DELETE PRODUCT */

router.delete('/:id',async (req)=> {
    try {
        multi = await Multiplicateur.delete(req);
        res.status(201).send(multi);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

/*function (err, post) {
    if (err) return next(err);
    res.json(post);
}*/