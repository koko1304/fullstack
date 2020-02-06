// Frameworks
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

// Access Users Collection
const UsersModel = require("../models/users");

// To get the client id and client secret keys go to https://console.developers.google.com
// Go to dashboard create new project and enable api
// find google plus api and enable
// go to credentials click create credentials and pick Oauth client id
// click configure consent screen fill out product name and save
// choose web application fill out authorize origin with your domain
// fill out authorize redirect url that will match with the configuration u setup to google outh
// click create and you will get client id and client secret
const { G_CLIENT_ID, G_CLIENT_SECRET } = require("../config/keys");

// Create google auth
passport.use(
	new GoogleStrategy(
		// Give google auth an configuration
		{
			clientID: G_CLIENT_ID,
			clientSecret: G_CLIENT_SECRET,
			// This url must match with redirect url you set up with google
			callbackURL: "/auth/google/callback"
		},
		// This function will be call after user successful login to google and redirect to
		// the url that you provide
		// accessToken: using to access user info from google
		// refreshToken: will be give when accessToken has expired
		// profile: is the user info
		async (accessToken, refreshToken, profile, done) => {
			const { id, emails, name } = profile;

			// Check to see is user already existed
			const existedUser = await UsersModel.findOne({ googleId: id });

			// is user existed ?
			if (existedUser) {
				console.log("user existed");

				// he/she is our old user so let authorize them
				// "done" using to finish authentication process
				// if "done(err, false)" user will unauthorize
				// if "done(null, false)" user will unauthorize
				// if "done(null, user)" user will authorize, also you can access user in req.user
				return done(null, existedUser);
			}
			// precreate new user into users collection
			const newUser = new UsersModel({
				googleId: id,
				email: emails[0].value,
				firstname: name.givenName,
				lastname: name.familyName
			});

			// Record the new user into the database
			const user = await newUser.save();

			console.log("User had created");

			// We already record our new user and authorize them
			// "done" using to finish authentication process
			// if "done(err, false)" user will unauthorize
			// if "done(null, false)" user will unauthorize
			// if "done(null, user)" user will authorize, also you can access user in req.user
			done(null, user);
		}
	)
);

// This function will be call after user successful authorize
// user argument is the user that u pass to done function in the strategy setup
// done expect 2 params
// first param using to pass an error or null
// second param telling passport which info that you want to encrypt and assign to cookies
passport.serializeUser((user, done) => {
	// I prefer user id to be encrypt and assign to cookies
	// user.id is not the googleId but instead it is a unique mongodb id of the user
	done(null, user.id);
});

// This function will be call when passport receive any cookie from the request
// so this function can be decide should user authorize to login or not
// when we authorize user so other function like strategy and serializeUser won't be run
// the first param is the info that get from the decrypt cookie
// so u can use it to find the user in the database and decide to authorize the user or not
passport.deserializeUser((id, done) => {
	// find user in the database by the giving id from the cookie
	UsersModel.findById(id, (err, user) => {
		if (err) throw err;

		// if we found a user so we give them authorize to login
		// if "done(null, user)" user will authorize, also you can access user in req.user
		done(null, user);
	});
});
