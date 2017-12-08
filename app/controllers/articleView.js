const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const fs = require('fs');
const Article = require('../models/article.js');
const User = require('../models/user.js');

class articleView{
    ismember(req, res, next){ 


        if (req.session.user) { 

            let userCo = req.session.user._id;
            

            User.find({_id:req.session.user._id}, function(err, user){

               

               Article.find({},  function(err, articles){



                res.render('blog', {

                    user : user,
                    userCo:userCo,
                    articlePop : articles,
                    article: articles,
                    layout: 'layoutIndex'
                    
                    
                })

            })

           })




        } else {

            next();

        }

    }

    list(req, res){
        let userCo = 1;
        User.find({}, function(err, user){
            Article.find({}, ((err, articles)=>{

                res.render('blog', 
                    {   user:user,
                        userCo:userCo,
                        articlePop : articles,
                        article : articles,
                        layout : 'layoutIndex',
                    })                   
            }))
        })    
    }
    userProfile(req, res){
       

        User.find({_id:req.session.user._id}, ((err, userR) =>{
            res.render('admin/userProfile.ejs', {userR :userR, layout : 'admin/userProfile.ejs' })

        }))
    }



    /*list(req, res){
         

        
            console.log('la session',req.session.user);
        
        User.find({role:'member'}, function(err, users){
            
            users.filter((userfiltered) => {

        Article.find({},  function(err, articles){
            if(req.session.user ){
            
            
                res.render('blog', {
                    user:req.session.user,
                    userfiltered : userfiltered,
                    articlePop : articles,
                    article: articles,
                    layout: 'layoutIndex'
                    
                    
                })
            }else{
                res.render('blog', {
                    
                    
                    articlePop : articles,
                    article: articles,
                    layout: 'layoutIndex'
                    
                    
                })

            }
            })
        })
        })
    else {
        console.log('le else');
        
        Article.find({},  function(err, articles){
            
                res.render('blog', {
                    articlePop : articles,
                    article: articles,
                    layout: 'layoutIndex'
                    
                    
                })
            })
    }
}*/


midlleware(req, res, next){
    Article.find({},((err, articles)=>{
        req.articlePop = articles;
        next();
    }))
}
articles(req, res){
    Article.find({}, ((err, articles)=>{
        res.render('article.ejs',
        {
           articlePop : req.articlePop,
           layout : 'layoutIndex',
           id : req.params.id,      
           mesArticles : articles.filter((article)=>{
               return article.id == req.params.id
           }) 
           [0]
       })
    }))
}
}

module.exports = new articleView();