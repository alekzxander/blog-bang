
const Article = require('../models/article');

class articleView{
    list(req, res){
        Article.find({}, ((err, articles)=>{
            res.render('index.ejs', {article : articles })
           
        }))
        
    }
    articles(req, res){
        Article.find({}, ((err, articles)=>{
            res.render('article.ejs', {
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