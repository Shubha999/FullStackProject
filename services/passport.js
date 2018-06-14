/* Importing passport for oauth*/

// gives express the idea how to handle authentication
const passport = require('passport');

//instructs how to authenticate our users with googleOAuth
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Importing keys
const keys = require('../config/keys');

// instructs passport to use specific strategy from Google
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback', //route handler to express application to handle a user coming back to our app
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(('accessToken:', accessToken));
			console.log(('refreshToken:', refreshToken));
			console.log(('profile', profile));
		},
	),
);
