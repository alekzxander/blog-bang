const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const Article = require('../models/article');
var multer = require('multer');
const fs = require('fs');
const User = require('../models/user.js');

let target_path;
let tmp_path;
let img_path;

class articleController {

    create(req, res) {
            
        res.render('admin/createArticle.ejs', { layout: 'admin/createArticle.ejs' });
    
    }

    // Crée un article    
    postArticle(req, res) {
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
           author: req.body.author,
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

    // Crée un brouillon 
    saveAsDraft(req, res) {
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
            preview: req.body.preview,
            content: req.body.content,
            img: img_path,
            author: req.body.author,
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




    list(req, res) {
        Article.find({}, function (err, article) {
            res.render('admin/liste-articles.ejs', { article: article, layout: 'admin/liste-articles.ejs' });
        })
    }


    showEdit(req, res) {
        Article.findOne({ _id: req.params.id }, function (err, article) {
            res.render('admin/editer-article.ejs', { layout: 'admin/editer-article.ejs', article });
        })
    }


    // Publier un brouillon
    draftToArticle(req, res) {

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
            title: req.body.title,
            preview: req.body.preview,
            content: req.body.content,
            img: img_path,
            author: req.body.author,
            brouillon: false
        };
        Article.findByIdAndUpdate({ _id: req.params.id }, article, () => {
            if (fileToUpload != undefined || fileToUpload != null) {
                let src = fs.createReadStream(tmp_path);
                let dest = fs.createWriteStream(target_path);
                src.pipe(dest);
                fs.unlink(tmp_path);
            }
            res.redirect('/admin/liste-articles/');
        })
    }


    // Supprimer un article
    delete(req, res) {
        let article = req.body;
        Article.findByIdAndRemove({ _id: req.params.id }, article, () => {
            res.redirect('/admin/liste-articles/');
        })
    }


    // Editer un article / brouillon
    edit(req, res) {
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
            img: img_path,
            title: req.body.title,
            preview: req.body.preview,
            content: req.body.content,

            brouillon: req.body.brouillon
        };


        Article.findByIdAndUpdate({ _id: req.params.id }, article, () => {
            if (fileToUpload != undefined || fileToUpload != null) {
                let src = fs.createReadStream(tmp_path);
                let dest = fs.createWriteStream(target_path);
                src.pipe(dest);
                fs.unlink(tmp_path);
            }
            res.redirect('/admin/liste-articles');
        })

    }

}

module.exports = new articleController();







