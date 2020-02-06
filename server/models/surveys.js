// Frameworks
const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipientSchema = require("./recipient");

const SurveysSchema = new Schema({
	title: String,
	subject: String,
	body: String,
	// This recipients will contain an array of object that have structure like create
	// in recipientSchema
	recipients: [recipientSchema],
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	// _user will be store an id of user who created it
	_user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	dateSent: Date,
	lastResponded: Date
});

const SurveysModel = mongoose.model("surveys", SurveysSchema);

module.exports = SurveysModel;
