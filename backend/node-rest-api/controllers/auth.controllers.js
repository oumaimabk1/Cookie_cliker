const Player = require('../models/Player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const boom = require('boom');
const Multiplicateur = require('../models/multiplicateur');

module.exports = {
    register: async (req, res, next) => {

        try {
            // check if account already exist
            let player = await Player.findOne({ email: req.body.email });
            if (player) {
                return next(boom.badRequest('User already exist'));
            }
            //crypt("12345", 4) ---> "34567"
            // paswword crypt
            const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(req.body.password, salt);
            //insert user into DB
            player = new Player({
                name: req.body.name,
                email: req.body.email,
                password: password,
            })
            player = await player.save();
            Multiplicateur.find({}, function(err, multiplicateurs) {
                Player.updateOne({ name: req.body.name }, { $push: { multiplicateur:  multiplicateurs  } }, function(err, player) {
                  console.log(player);
                });
              });
            res.json({
                player
            })
            // return user id
            

        } catch (err) {
            return next(boom.internal(err.message));
        }
    },

    login: async (req, res, next) => {
        try {
            let user = await Player.findOne({ email: req.body.email });
            if (!user) {
                return next(boom.unauthorized("Invalid email or password"));
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return next(boom.unauthorized("Invalid email or password"));
            }

            // generate token
            const token = jwt.sign({
                id: user._id,
                name: user.name
            }, config.get('jwtPrivateJey'), { expiresIn: '5min' });

            res.json({
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    multiplicateur: user.multiplicateur
                }
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }

    },

    me: async (req, res, next) => {
        console.log(req.user)
        try {
            const user = await Player.findById(req.user.id).select('-password');
            res.json(user);
        } catch (err) {
            return next(boom.internal(err.message));
        }
    }
}