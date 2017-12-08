var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var nodemailer = require("nodemailer");
var multer = require('multer');
const fs = require('fs');
var Article = require('../models/article.js');
var User = require('../models/user.js');


exports.loggedIn = function(req, res, next)
{
	if (req.session.user) { // req.session.passport._id

		next();

	} else {

		res.redirect('/login');

	}

}

exports.home = function(req, res) {
	res.render('admin/dashboard.ejs',{layout : 'admin/dashboard.ejs'}, {
		error : req.flash("error"),
		success: req.flash("success"),
		session:req.session,
	});
}

exports.signup = function(req, res) {
	if (req.session.user) {
		res.redirect('/home');
	} else {
		res.render('signup', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session,
			layout : 'signup'
		});
	}
}

exports.login = function(req, res) {
	if (req.session.user) {
		res.redirect('/');
	} else {
		res.render('login', {
			layout : 'login',
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
}
exports.reglage = function(req,res){
	
	User.find({role:'admin'}, ((err, adm)=>{
        res.render('admin/adminProfile.ejs', {adm :adm, layout : 'admin/adminProfile.ejs' })

        }))
}



exports.updateProfile = function(req,res){
	
	User.findOneAndUpdate({role:'admin'},{ $set:  req.body}, function (err) {
		if (err) return (err);
	});
	res.redirect('admin/dashboard')
}

exports.changePassword = function (req, res) {
	
	User.findOne({role:'admin'} , function(err, user) {
		user.password = req.body.password;
		user.save(function(err) {
			req.logIn(user, function(err) {
			});
		});
	});
	res.redirect('admin/dashboard')
}

exports.mailer = function(req, res) {
	var smtpTransport = nodemailer.createTransport({
		service: "gmail",

		auth: {
			user: "blogbang974@gmail.com",
			pass: "admin974"
		}
	});

	var mail = {
		to: 'oinanaphone@gmail.com',
		from: 'blogbang974.com',
		subject: 'Validation de nouveau mot de passe',
		text: 'Ceci est un message automatique generé lors de votre premiere connexion sur le site de vote de la CFDT\n\n' +
		'Veuillez cliquer sur le lien suivant pour aller sur la page de validation de mot de passe:\n\n' +
		'http://' + req.headers.host + '/login/ \n\n' +
		'Si vous etes deja connecté a votre espace de vote CFDT,ne tenez pas compte de ce message et votre mot de passe restera inchangé.\n'
	};

	smtpTransport.sendMail(mail, function(error, response){
		if(error){
			console.log("Erreur lors de l'envoie du mail!");
			console.log(error);
		}else{
			console.log("Mail envoyé avec succès!")
		}
		smtpTransport.close();
	});

}



