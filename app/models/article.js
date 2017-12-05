var mongoose = require('mongoose');
var articleSchema = mongoose.Schema({	
	
	title: String,
	brouillon: {type:Boolean, default:false},
	preview: String,
	content: String,
	created_date: Date,
	img : String

});
module.exports = mongoose.model('article', articleSchema);