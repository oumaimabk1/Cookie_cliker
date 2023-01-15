var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Player = require('../controllers/auth.controllers');
const authMiddl = require ('../middelwares/auth')

/* REGISTER */

router.post('/register', Player.register)

/**LOGIN */;

router.post('/login', Player.login);

/* RETRIEVE ME */
router.get('/me', authMiddl ,Player.me);

module.exports = router;