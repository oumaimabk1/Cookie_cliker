var mongoose = require('mongoose');


var MultiSchema = new mongoose.Schema({
 name: String,
 multi:Number,
 cost:Number,
 numberOfBuy : Number,
 TotalCost : Number,
});

module.exports = mongoose.model('Multiplicateur', MultiSchema);