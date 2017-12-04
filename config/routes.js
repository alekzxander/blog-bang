var home = require('../app/controllers/home');
const permissions = require('./permissions');

var articleController = require('../app/controllers/articleController');

//you can include all your controllers

module.exports = function (app, passport) {

    app.get('/login', home.login);
    app.get('/signup', home.signup);

    /* Admin */
    app.get('/admin/dashboard', (req, res)=>{
        res.render('admin/dashboard.ejs')
    });
    app.get('/admin/creer-article', articleController.create);

    app.get('/',(req, res)=>{
        res.render('index.ejs')
    } );//home


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', (req, res, next) => {
        //Redirect user according to role
        passport.authenticate('local-login', (err, user, info) => {
                if (err) {
                    return res.redirect('/login');
                }
                if (!user) {
                    return res.redirect('/login');
                }
                //Log in the user
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    //redirect the user to dashboard when it's an admin
                    if (user.role === 'admin') {
                        return res.redirect('admin/dashbord');
                    }
                    //redirect user to the homepage for no admin user
                    return res.redirect('/');
                });
            })
            (req, res); //<-- give access to req and res for the callback of authenticate
    });
    
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}
