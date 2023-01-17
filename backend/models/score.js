var mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    points: Number,
  });


module.exports = mongoose.model('Score', ScoreSchema);