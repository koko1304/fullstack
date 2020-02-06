import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";

// Action Creators
import { recordToken } from "../actions";

// Create a payments button for user to click and pay with any type of credit card
class Payments extends Component {
	handleToken(token) {
		// Send token back to server
		this.props.recordToken(token);
	}

	render() {
		// amount: is using to tell stripe the amount of money that u want to charge from user
		//		default currency is US dollar, amount it expect is cent so 500 mean 500 cent and equal 5$
		//		if user change our amount in client so server still charge them 5$
		// stripeKey: is using to provide the stripe public key
		// name: will show on the top of the card form
		// description: will show below the name

		// Note: u can provide StripeCheckout your custom button by giving it as child component
		return (
			<StripeCheckout name="Title" description="Lorem ipsum dolor sit amet." amount={500} token={this.handleToken.bind(this)} stripeKey="pk_test_h4OTifsgPyqyuzn6oUGZrGdC">
				<button className="btn btn-primary">Add Credit</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, { recordToken })(Payments);
