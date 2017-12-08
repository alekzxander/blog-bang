var ConnectRoles = require('connect-roles');
var permissions = new ConnectRoles({
    failureHandler: (req, res, action) => {
        // OPTIONAL FUNCTION TO CUSTOMISE CODE THAT RUNS WHEN USER FAILS AUTHORISATION
        var accept = req.headers.accept || ''; 
        res.status(403);
        if (~accept.indexOf('html')) {

                if(req.user.role == 'member'){
                res.redirect('/'); // TODO : change the url for the user homepage

            }

            
        } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});


permissions.use('acces page admin', (req) => {
    if (req.user !== undefined && req.user.role === 'admin') {
        return true;
    }
})

//admin users can access all pages
permissions.use(function (req) {
    if (req.user !== undefined && req.user.role === 'admin') {
        return true;
    }
});

module.exports = permissions;