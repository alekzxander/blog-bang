var home = require('../app/controllers/home');
var articleController = require('../app/controllers/articleController');

//you can include all your controllers

module.exports = function (app, passport) {

    app.get('/login', home.login);
    app.get('/signup', home.signup);

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
    app.post('/login', (req, res) => {
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
                    if (user.local.role === 'admin') {
                        return res.redirect('/dashbord');
                    }
                    //redirect user to the homepage for no admin user
                    return res.redirect('/');
                });
            })
            (req, res); //<-- give access to req and res for the callback of authenticate
    });


}
