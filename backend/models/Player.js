var mongoose = require('mongoose');
const Multiplicateur = require('./multiplicateur')
var PlayerSchema = new mongoose.Schema({
 name: String,
 email: String,
 password: String,
 score: Number,
 multiplicateur : {
    type: Array,
    ref: 'Multiplicateur'
  },
  score: Number
});

module.exports = mongoose.model('Player', PlayerSchema);