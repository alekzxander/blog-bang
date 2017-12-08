
var userController = require('../app/controllers/userController');
const permissions = require('./permissions');
const request = require('request');
var articleController = require('../app/controllers/articleController');
const articleView = require('../app/controllers/articleView');
var multer = require('multer');
const Article = require('../app/models/article');
var User = require('../app/models/user.js');

const upload = multer({ dest: 'public/images/' });


module.exports = function (app, passport) {


    /* GET Admin */
    app.get('/admin/dashboard',permissions.can('acces page admin'), userController.loggedIn, (req, res) => {
        res.render('admin/dashboard.ejs', { layout: 'admin/dashboard.ejs' })
    });

    app.get('/admin/creer-article', permissions.can('acces page admin'),userController.loggedIn, articleController.create);
    app.get('/admin/liste-articles', permissions.can('acces page admin'),userController.loggedIn, articleController.list);
    app.get('/admin/liste-articles/editer-article/:id', permissions.can('acces page admin'),userController.loggedIn,articleController.showEdit);
    app.get('/admin/liste-articles/editer-article/delete/:id', permissions.can('acces page admin'), userController.loggedIn,articleController.delete);
    app.get('/admin/myProfile', permissions.can('acces page admin'),userController.loggedIn, userController.reglage); 

    /* Post Admin */
    app.post('/post-article', permissions.can('acces page admin'), upload.single('img'),userController.loggedIn, articleController.postArticle);
    app.post('/post-draft', permissions.can('acces page admin'), upload.single('img'),userController.loggedIn, articleController.saveAsDraft);
    app.post('/admin/liste-articles/publier-brouillon/:id', permissions.can('acces page admin'),userController.loggedIn, upload.single('img'), articleController.draftToArticle);
    app.post('/admin/liste-articles/editer-article/:id', permissions.can('acces page admin'),userController.loggedIn, upload.single('img'), articleController.edit);
    app.post('/updateProfile', permissions.can('acces page admin'),userController.loggedIn, userController.updateProfile);
    app.post('/changepass', permissions.can('acces page admin'),userController.loggedIn, userController.changePassword);

    /* Blog */
    app.get('/', articleView.ismember,  articleView.list);
    app.get('/userProfile', userController.loggedIn,articleView.userProfile);
    app.use('/articles/:id', articleView.midlleware);
    app.get('/articles/:id', articleView.articles);

    /* Sign up */
    app.get('/login', userController.loggedIn,userController.login);
    app.get('/signup', userController.loggedIn,userController.signup);


    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', 
        failureRedirect: '/signup', 
        failureFlash: true 
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin/dashboard', 
        failureRedirect: '/', 
        failureFlash: true 
    }));

    app.get('/sendMail', userController.mailer);
}


















