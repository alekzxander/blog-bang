var mongoose = require('mongoose');
var articleSchema = mongoose.Schema({	
	
	title: String,
	author:  String,
	brouillon: {type:Boolean, default:false},
	preview: String,
	content: String,
	date: {type: Date, required: true, default: Date.now},
	img : String,
	like : {type : Number, default: 0},
	commentaire : [
		{
			name : { type : String},
			date : { type : Date, required:true, default: Date.now},
			text : { type : String}
		}]
	

});
module.exports = mongoose.model('article', articleSchema);