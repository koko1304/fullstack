// Middlewares
const requiredAuth = require("../middlewares/required-auth");
const requireCredit = require("../middlewares/required-credit");

// Survey Model
const SurveysModel = require("../models/surveys");

const Mailer = require("../services/mailer");
const surveyTemplate = require("../services/mail-template/survey-template");

module.exports = app => {
	app.get("/api/surveys/greet", (req, res) => {
		res.send("Thank you for voting!");
	});

	app.post("/api/surveys", requiredAuth, requireCredit, async (req, res) => {
		const { title, subject, body, recipients } = req.body.survey;

		const survey = new SurveysModel({
			title,
			subject,
			body,
			recipients: recipients.split(",").map(email => ({ email: email.trim() })),
			// req.user.id === _id of mongodb
			_user: req.user.id,
			dateSent: Date.now()
		});

		// try will watch over all the statements and if any error occur
		// catch function will be run with error as argument
		try {
			const mailer = new Mailer(survey, surveyTemplate(survey));
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
