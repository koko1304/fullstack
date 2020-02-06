// Frameworks
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Build up the documents properties
const UsersSchema = new Schema({
	email: String,
	googleId: String,
	firstname: String,
	lastname: String,
	credits: {
		type: Number,
		default: 0
	}
});

// Create collection users and assign the schema in
const UsersModel = mongoose.model("users", UsersSchema);

module.exports = UsersModel;
