// Stripe Secret Api Key
const { STRIPE_SECRET } = require("../config/keys");
// stripe lib required stripe secret key
const stripe = require("stripe")(STRIPE_SECRET);

// Middlewares
const requiredAuth = require("../middlewares/required-auth");

module.exports = app => {
	app.post("/api/stripe", requiredAuth, async (req, res) => {
		// This function will be going to charge the user from amount of money u specify
		// amount: specify the amount of money you want to charge so 500cent equal 5$
		// currency: specify the type of money you want to charge so we required us dollar
		// description: specify reminder text for your charge process
		// source: specify token id that get from the client process
		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			description: "We are charge you 5$",
			source: req.body.stripeTokenId
		});

		if (charge.paid) {
			// Update total money in the user record
			req.user.credits += 5;

			// Save change to the database
			const user = await req.user.save();

			// Send back user to client
			return res.send(user);
		}

		res.send(user);
	});
};
