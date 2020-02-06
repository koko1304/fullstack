module.exports = (req, res, next) => {
	// if user not yet login so stop user and send back err
	if (!req.user) {
		return res.status(401).send({ err: "unauthorize" });
	}

	next();
};
