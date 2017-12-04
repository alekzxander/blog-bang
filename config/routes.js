var home = require('../app/controllers/home');
var articleController = require('../app/controllers/articleController');

//you can include all your controllers

module.exports = function (app, passport) {

    app.get('/login', home.login);
    app.get('/signup', home.signup);

    /* Admin */
    app.get('/admin/dashboard', home.home);

    app.get('/admin/creer-article', articleController.create);
    app.get('/admin/liste-articles', articleController.list);

    app.post('/post-article', articleController.postArticle);


    app.get('/',(req, res)=>{
        res.render('index.ejs')
    } );//home


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
}
