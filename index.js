/* require is used to gain access to express, which has common JS module. Node doesn't have workaround for
ES2015 so we don't use import for importing package, but in FE for React we will use import */

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);

/* App object is setup to listen the incoming request that is routed from the site from Node */
// app here is a defintion which represnts a running express app
const app = express();

//MW parses the body and assigns to property of incoming req object
app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //for 30days
		keys: [keys.cookieKey], //key to encypt our cookie
	}),
);

//telling passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	//Express will serve up production assets like main.js or main.css file
	app.use(express.static('client/build'));

	// Express will serve up index.html file if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// instructs express to tell Node that it wants to listen the upcoming traffic on this port

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/* Heroku Deployment 

Visit app inside browser
https://powerful-fjord-36688.herokuapp.com/ 

Deployment target, i.e. git repository that we can push our local server to
https://git.heroku.com/powerful-fjord-36688.git

*/
