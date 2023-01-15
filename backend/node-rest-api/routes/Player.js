var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Player = require('../models/Player');

router.get('/', function (req, res, next) {
    Player.find(function (err, players) {
        if (err) return next(err);
        res.json(players);
    });
});

router.get('/:id', function (req, res, next) {
    Player.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/*add multipicateur and score*/
router.post('/:id', function (req, res, next) {
Player.findOneAndUpdate({ _id: req.params.id }, { $set: { score: req.body.score, multiplicateur: req.body.multiplicateur } }, { new: true }, function(err, player) {
    if (err) return handleError(err);
    console.log(player);
  });
});

/* UPDATE Player */

router.put('/:id', function (req, res, next) {
    Player.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


/* DELETE player */

router.delete('/:id', function (req, res, next) {
    Player.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;