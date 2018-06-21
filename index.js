/* require is used to gain access to express, which has common JS module. Node doesn't have workaround for
ES2015 so we don't use import for importing package, but in FE for React we will use import */

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

mongoose.connect(keys.mongoURI);
require('./models/User');
require('./services/passport');

/* App object is setup to listen the incoming request that is routed from the site from Node */
// app here is a defintion which represnts a running express app
const app = express();

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

// instructs express to tell Node that it wants to listen the upcoming traffic on this port

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/* Heroku Deployment 

Visit app inside browser
https://powerful-fjord-36688.herokuapp.com/ 

Deployment target, i.e. git repository that we can push our local server to
https://git.heroku.com/powerful-fjord-36688.git

*/
