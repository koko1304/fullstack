// Frameworks
const passport = require("passport");

// build up the google oauth strategy before we can use it
require("../strategy/google");

// Create google oauth middleware
const googleAuth = passport.authenticate("google", {
	// tell google which info that you want to get from user account
	scope: ["profile", "email"]
});

// Middlewares
const requiredAuth = require("../middlewares/required-auth");

module.exports = app => {
	// Route that will handle google login
	app.get("/auth/google", googleAuth);

	// Tell google oauth to handle redirect link from google
	app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
		res.redirect("/surveys");
	});

	app.get("/auth/logout", requiredAuth, (req, res) => {
		// This function have been attach by passport when it create cookie for user
		// call this function will be result in destroy the cookie and req.user
		req.logout();

		if (!req.user) {
			res.send({ login: false });
		} else {
			res.send({ login: true });
		}
	});

	// Check for user login cookie
	app.get("/auth/islogin", (req, res) => {
		if (req.user) {
			// if user already login so send back true
			return res.send({ login: true });
		}

		// if user not yet login so send back false
		res.send({ login: false });
	});
};
