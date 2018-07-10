//next here is called when everthing is done, next function pass the request to next MW in chain
module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(403).send({ error: 'You must log in!' });
	}
	next();
};
