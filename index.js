/* require is used to gain access to express, which has common JS module. Node doesn't have workaround for
ES2015 so we don't use import for importing package, but in FE for React we will use import */

const express = require('express');

/* App object is setup to listen the incoming request that is routed from the site from Node */
// app here is a defintion which represnts a running express app
const app = express();

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

// instructs express to tell Node that it wants to listen the upcoming traffic on this port

const PORT = process.env.PORT || 5000;
app.listen(PORT);
