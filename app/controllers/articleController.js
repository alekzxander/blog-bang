const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const Article = require('../models/article');
var multer = require('multer')
const fs = require('fs')



class articleController{
    
    create(req, res){
        res.render('admin/createArticle.ejs');
    }

    list(req, res){
        Article.find({}, function(err, article){
            res.render('admin/liste-articles.ejs', {article: article});
        })
    }

    postArticle (req, res){
        
        var fileToUpload = req.file;
        var target_path = 'public/images/' + fileToUpload.originalname;
        var tmp_path = fileToUpload.path;
      
        
        
        let myData = new Article({
           title : req.body.title,
           preview : req.body.preview,
           content : req.body.content,
           img : fileToUpload.originalname
        });
      
        
        myData.save()
        .then(item => {
            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            fs.unlink(tmp_path);
            res.redirect("/admin/creer-article"); 
        })
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        });  
    }  


}


module.exports = new articleController();