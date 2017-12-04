var userController = require('../app/controllers/userController');
var articleController = require('../app/controllers/articleController');

//you can include all your controllers

module.exports = function (app, passport) {

    app.get('/login', userController.login);
    app.get('/signup', userController.signup);

    /* Admin */
    app.get('/admin/dashboard');
    app.get('/admin/creer-article', articleController.create);

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
    app.get('/sendMail',userController.mailer)


}
