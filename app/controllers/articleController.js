const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');

class articleController{
    
    create(req, res){
        res.render('admin/createArticle.ejs');
    }


}


module.exports = new articleController();