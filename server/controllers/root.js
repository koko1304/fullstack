// Middlewares
const requiredAuth = require("../middlewares/required-auth");

module.exports = app => {
	app.get("/", requiredAuth, (req, res) => {
		res.send(req.user);
	});
};
