//Import original npm passport module

const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
			prompt: 'select_account',
		}),
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		},
	);

	app.get('/api/logout', (req, res) => {
		req.logout(); //takes the cookie and kills the user id we have, so that session is killed
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
