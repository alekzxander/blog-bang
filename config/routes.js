
var userController = require('../app/controllers/userController');
const permissions = require('./permissions');
var articleController = require('../app/controllers/articleController');
const articleView = require('../app/controllers/articleView')
var multer = require('multer')
const upload = multer({
    dest: 'public/images/'
})
//you can include all your controllers

module.exports = function (app, passport) {

    app.get('/login', userController.login);
    app.get('/signup', userController.signup);

    /* Admin */
    app.get('/admin/dashboard', (req, res)=>{
        res.render('admin/dashboard.ejs')
    });
    app.get('/admin/creer-article', articleController.create);
    app.post('/post-article', upload.single('img'),  articleController.postArticle);
    
    app.post('/post-draft', upload.single('img'), articleController.saveAsDraft);
    
    app.get('/admin/liste-articles', articleController.list)

    app.post('/admin/liste-articles/publier-brouillon/:id', articleController.draftToArticle);

    app.get('/admin/liste-articles/editer-article/:id', articleController.showEdit);
    app.post('/admin/liste-articles/editer-article/:id', articleController.edit);
    app.get('/admin/liste-articles/editer-article/delete/:id', articleController.delete);


    app.get('/', articleView.list);

    app.get('/articles/:id', articleView.articles)


    /* passport login */
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/sendMail',userController.mailer)



}
