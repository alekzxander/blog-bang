var mongoose = require('mongoose');
var articleSchema = mongoose.Schema({	
	
	title: String,
	created_date: Date,
	image: String,
	brouillon: {type:Boolean, default:false},
	preview: String,
	content: String,
	updated_date: Date,
	comment: [ mongoose.Schema.Types.Mixed ]

});
module.exports = mongoose.model('article', articleSchema);