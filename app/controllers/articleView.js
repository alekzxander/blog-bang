
const Article = require('../models/article');

class articleView{
    list(req, res){
        Article.find({}, ((err, articles)=>{
            res.render('blog', 
                {
                     article : articles,
                     layout : 'layoutArticle'
                 })         
        }))     
    }
    articles(req, res){
        Article.find({}, ((err, articles)=>{
            res.render('article',
                 {
                     layout : 'layoutArticle',
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