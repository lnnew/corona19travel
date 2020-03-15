var db = require('../lib/db');
var bcrypt = require('bcryptjs');

module.exports = function (app) {

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        console.log('serializeUser', user);
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        var user = db.get('users').find({
            id: id
        }).value();
        console.log('deserializeUser', id, user);
        done(null, user);
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pwd',
            session: true
        },
        function (email, password, done) {
            console.log('LocalStrategy', email, password);
            var user = db.get('users').find({
                email: email
            }).value();
            if (user) {
                bcrypt.compare(password, user.password, function(err,result){
                    if(result){
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            } else {
                return done(null, false);
            }
        }
    ));
    return passport;
}
