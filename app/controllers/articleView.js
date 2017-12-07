
const Article = require('../models/article');

class articleView{
    list(req, res){
        Article.find({}, ((err, articles)=>{
            res.render('blog', 
                {
                    articlePop : articles,
                    article : articles,
                     layout : 'layout',
                 })                   
        }))     
    }
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