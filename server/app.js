// Frameworks
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Create express app to build the server
const app = express();

// Create an listen port
// If there is no default configuration port so using 3000 instead
// Some hosting already providing default port for the web so that
// why we using process.env.PORT to check it out is there existed one
const port = process.env.PORT || 8080;

// Config express to handle json data
app.use(bodyParser.json());

// fix cross origin resource sharing
app.use(cors());

// Set up middleware to handle cookie session that send with the request from the user
const { cookieSecret } = require("./config/keys");
// Config the cookie
app.use(
	cookieSession({
		// Set up expired date for cookies
		maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days
		// Secret keys using to encrypt the info before send to user
		// you can specify multiple keys and only one will pick to encrypt
		keys: [cookieSecret]
	})
);

// passport.initialize() is using to check for any cookie from the user request
// it using pair with passport.session() and work together
app.use(passport.initialize());
// passport.session() will take cookie from the user and decrypt it
// and call the deserializeUser function and pass the decrypt info to it
app.use(passport.session());

// Import controllers
require("./controllers")(app);

// Both of express.static and route * must be put below all api route
// Handle any request for static file
// app.use(express.static("client/build"));

// * route must be put below express static route
// Handle for unknown api request and send back index.html file
// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

// Mongodb Connection String
const CONNECTION_STRING = require("./config/mongodb");

// Connecting to mongodb atlas database
mongoose.connect(CONNECTION_STRING, err => {
	if (err) throw err;

	// Start the server and listen on the created port
	app.listen(port, () => {
		// Log when the server already started
		console.log("Server Listen on Port", port);
	});

	console.log("Connected to mongodb atlas");
});
