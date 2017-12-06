
const Article = require('../models/article');

class articleView{
    list(req, res, next){
        Article.find({}, ((err, articles)=>{
            res.render('blog', 
                {
                    article : articles,
                     layout : 'layout',
                 
                 })          
        }))     
    }
    // midll(req, res, next){
    //     Article.find({},((err, articles)=>{
    //         // req.articlePop = articlePop;
    //         next();
    //     }))
    // }
    articles(req, res){
        Article.find({}, ((err, articles)=>{
            res.render('article.ejs',
                 {
                     layout : 'layout',
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