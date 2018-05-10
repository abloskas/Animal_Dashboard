var mongoose = require('mongoose');
var AnimalSchema = new mongoose.Schema({
    animal: String
})

module.exports = mongoose.model('Animal', AnimalSchema); 
var Animal = mongoose.model('Animal');