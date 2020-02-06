import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const fields = [
	{
		name: "title",
		label: "Title"
	},
	{
		name: "subject",
		label: "Subject"
	},
	{
		name: "body",
		label: "Body"
	},
	{
		name: "recipients",
		label: "Recipients"
	}
];

class SurveyForm extends Component {
	createInputField({ meta: { invalid, touched, error }, input, label }) {
		return (
			<div className="form-group">
				<label htmlFor={input.name}>{label}</label>
				<input className={`form-control ${invalid && touched ? "is-invalid" : ""}`} id={input.name} {...input} />
				<p className="invalid-feedback">{error}</p>
			</div>
		);
	}

	generateFields() {
		return fields.map(({ name, label }) => {
			return <Field key={name} name={name} label={label} component={this.createInputField} />;
		});
	}

	handleSubmit(values) {
		console.log(values);
	}

	render() {
		return (
			<div className="container py-5">
				<h1>Create Survey</h1>
				<form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
					{this.generateFields.call(this)}
					<button className="btn btn-primary mr-3" type="submit">
						Submit
					</button>
					<Link className="btn btn-danger" to="/surveys">
						Cancal
					</Link>
				</form>
			</div>
		);
	}
}

function validation(values) {
	var errors = {};

	return errors;
}

export default reduxForm({
	form: "createSurveyForm",
	validate: validation
})(connect()(SurveyForm));
