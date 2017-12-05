
const Article = require('../models/article');

class articleView{
    list(req, res){
        Article.find({}, ((err, article)=>{
            res.render('index.ejs', {article : article })
        }))
        
    }
}
module.exports = new articleView();