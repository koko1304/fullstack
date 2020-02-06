module.exports = app => {
	// Handle Root Route
	require("./root")(app);

	// Handle Auth Route
	require("./auth")(app);

	// Handle Billing Route
	require("./billing")(app);

	// Handle User Route
	require("./user")(app);

	// Handle Survey Route
	require("./survey")(app);
};
