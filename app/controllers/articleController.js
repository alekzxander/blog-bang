const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const Article = require('../models/article');

class articleController{
    
    create(req, res){
        res.render('admin/createArticle.ejs');
    }

    list(req, res){
        Article.find({}, function(err, article){
            res.render('admin/liste-articles.ejs', {article: article});
        })
    }

    postArticle(req, res){
        let myData = new Article(req.body);
        
        myData.save()
        .then(item => {
            res.redirect("/admin/creer-article"); 
        })
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        });  
    }  


}


module.exports = new articleController();