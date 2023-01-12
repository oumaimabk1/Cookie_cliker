var mongoose = require('mongoose');


var PlayerSchema = new mongoose.Schema({
 name: String,
 score: Number,
 multiplicator: Number,
 updated_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Player', PlayerSchema);