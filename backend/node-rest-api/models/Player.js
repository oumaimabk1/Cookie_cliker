var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
 name: String,
 email: String,
 password: String,
 score: Number,
 multiplicateur : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Multiplicateur'
  }],
  score: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Score'
  }
});

module.exports = mongoose.model('Player', PlayerSchema);