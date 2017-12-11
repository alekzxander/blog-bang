var mongoose = require('mongoose');
var userNewsletter = mongoose.Schema({
    name : String,
    email : String
})
module.exports = mongoose.model('userNews', userNewsletter);