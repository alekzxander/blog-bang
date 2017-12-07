const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const Article = require('../models/article');
var multer = require('multer')
const fs = require('fs')

let target_path;
let tmp_path;
let img_path;
class articleController{
    
    create(req, res){
        res.render('admin/createArticle.ejs',{layout :'admin/createArticle.ejs'});
    }

    list(req, res){
        
    }

    postArticle (req, res){
        let fileToUpload = req.file;

        if (fileToUpload != undefined || fileToUpload != null) {
            target_path = 'public/images/' + fileToUpload.originalname;
            tmp_path = fileToUpload.path;
            img_path = fileToUpload.originalname;
            console.log('pas defini')
        } else {
            img_path = req.body.img;
            console.log('defini en tant qu image')
        }     
        let myData = new Article({
           title : req.body.title,
           preview : req.body.preview,
           content : req.body.content,
           img : img_path,
           date : dateFormat,
           brouillon: false
        });
        
        myData.save()
        .then(item => {
            if (fileToUpload != undefined || fileToUpload != null) {
                let src = fs.createReadStream(tmp_path);
                let dest = fs.createWriteStream(target_path);
                src.pipe(dest);

                fs.unlink(tmp_path);
            }
            res.redirect("/admin/creer-article"); 
        })
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        });  
    } 

    // permet de sauvegarder en tant que brouillon - Crée article uniquement ! 
    saveAsDraft(req, res){
        let fileToUpload = req.file;

        if (fileToUpload != undefined || fileToUpload != null) {
            target_path = 'public/images/' + fileToUpload.originalname;
            tmp_path = fileToUpload.path;
            img_path = fileToUpload.originalname;
            console.log('pas defini')
        } else {
            img_path = req.body.img;
            console.log('defini en tant qu image')
        }
       let myData = new Article({
            title: req.body.title,
            preview : req.body.preview,
            content : req.body.content,
            img : img_path,
            date : dateFormat,
            brouillon: true 
        })

        myData.save()
        .then(item => {
            if (fileToUpload != undefined || fileToUpload != null) {
                let src = fs.createReadStream(tmp_path);
                let dest = fs.createWriteStream(target_path);
                src.pipe(dest);
                fs.unlink(tmp_path);
            }
            res.redirect("/admin/creer-article"); 
        })
            .catch(err => {
                res.status(400).send("Impossible de sauvegarder dans la db");
            });  
        }
            


        list(req, res){
            Article.find({}, function(err, article){
                res.render('admin/liste-articles.ejs', {article: article});
            })
        }
    
    
        showEdit(req,res){
            Article.findOne({_id: req.params.id}, function(err, article) { 
                res.render('admin/editer-article.ejs', {article});
            }) 
        }


  






    edit(req ,res){
        let fileToUpload = req.file;
   

        if (fileToUpload != undefined || fileToUpload != null) {
            target_path = 'public/images/' + fileToUpload.originalname;
            tmp_path = fileToUpload.path;
            img_path = fileToUpload.originalname;
        } else {
             img_path = req.body.img;
              console.log('defini en tant qu image : ' + img_path)
        }

        let article = {
            img : img_path,
            title: req.body.title,
            preview : req.body.preview,
            content : req.body.content,
            date : dateFormat,
            brouillon: req.body.brouillon
        };
            

        Article.findByIdAndUpdate({_id:req.params.id}, article, () => {
            if (fileToUpload != undefined || fileToUpload != null) {
                target_path = 'public/images/' + fileToUpload.originalname;
                tmp_path = fileToUpload.path;
                img_path = fileToUpload.originalname;
            } else {
                img_path = req.body.img;
            }
        })
    }

    draftToArticle(req, res){
        let article = {     
            title: req.body.title,
            preview : req.body.preview,
            content : req.body.content,
            img : img_path,
            date : dateFormat,
            brouillon: false 
        };
        Article.findByIdAndUpdate({_id:req.params.id}, article, () => {
            res.redirect('/admin/liste-articles/');
        })
    }


    delete(req, res){
        let article = req.body;
        Article.findByIdAndRemove({_id:req.params.id}, article, () => {
            res.redirect('/admin/liste-articles/');
        })
    }


}

module.exports = new articleController();