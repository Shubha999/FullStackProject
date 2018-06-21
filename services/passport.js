/* Importing passport for oauth*/

// gives express the idea how to handle authentication
const passport = require('passport');

//instructs how to authenticate our users with googleOAuth
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Importing keys
const keys = require('../config/keys');
const mongoose = require('mongoose');

//User object is our model class and we are retrieving users from the mongoose model here
const User = mongoose.model('users');

// function which takes a User model and generates some unique piece of information in cookie
passport.serializeUser((user, done) => {
	done(null, user.id); //user.id here is the unique id which is generated in mongoDB since user can authenticate via fb or any other services
});

passport.deserializeUser((id, done) => {
	//mongoose query findsbyId then promise chain for retrieving that user from the cookie
	User.findById(id).then(user => {
		done(null, user);
	});
});

// instructs passport to use specific strategy from Google
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback', //route handler to express application to handle a user coming back to our app
			proxy: true,
		},
		(accessToken, refreshToken, profile, done) => {
			//findOne finds the first googleId which has profile.id
			//asyn opertaion and to deal with that we have promise
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					//we already have record with the given profileID
					//done callback function is called to notify that we have completed doing the operation
					done(null, existingUser);
				} else {
					//we don't have existing User create a new one with this record
					//Use model class to create new instance of User. .save saves the instance to our database
					new User({ googleId: profile.id }).save().then(user => {
						done(null, user);
					});
				}
			});
		},
	),
);
