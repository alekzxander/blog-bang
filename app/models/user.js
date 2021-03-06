
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//define the schema for our user model
var userSchema = mongoose.Schema({	
	name: String,
	email: String,
	active_hash: String,
	password: { type: String, required: true },
	status: String,
	img: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	role: {
		type: String,
		default: "member"
	},
	isAdmin: {
		type: Boolean,
		default: "false"
	}

});


//methods ======================
//generating a hash
userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};
userSchema.methods.isMember = function() {
	return (this.role === "member");
};

// for change password
userSchema.pre('save', function(next) {
	//hash the password
	let user = this;
	 if (!user.isModified('password')) return next();
	this.password = this.generateHash(this.password);
	next();
});

//create the model for users and expose it to our app
module.exports = mongoose.model('ex_users', userSchema);