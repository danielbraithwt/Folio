var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	user = require("./mysql/user"),

passport.use(new LocalStrategy({
				usernameField: 'username',
				passwordField: 'password'
			},
			function(username, password, done) {
				return user.checkAuth(username, password, done);
			}));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;
