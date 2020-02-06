import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// action creators
import { logout, fetchUser } from "../actions";

// Components
import Payments from "./payments";
import Credits from "./credits";

class Header extends Component {
	componentWillMount() {
		if (this.props.auth) {
			this.props.fetchUser();
		}
	}

	handleLogout() {
		this.props.logout();
	}

	createBtn() {
		if (this.props.auth) {
			/* This Payments component will show stripe payment button for user to click 
			   and pay the money using credit card */
			return [
				<Link key="createSurvey" className="btn btn-primary mr-3" to="/survey/form">
					Create Survey
				</Link>,
				<Credits key="credit" />,
				<Payments key="payment" />,
				<button key="logout" onClick={this.handleLogout.bind(this)} className="btn btn-danger ml-3">
					{/* Please checking in package.json file
						we have set up proxy whenever any link match /auth/* so we will
						send user to domain http://localhost:8080/auth/logout instead of real domain */}
					Log Out
				</button>
			];
		}

		return (
			<a href="/auth/google" className="btn btn-primary">
				{/* Please checking in package.json file
					we have set up proxy whenever any link match /auth/* so we will
					send user to domain http://localhost:8080/auth/google instead of real domain */}
				Log in with Google+
			</a>
		);
	}

	createNavItems() {
		if (!this.props.auth) {
			return (
				<li className="nav-item active" key="home">
					<Link className="nav-link" to="/">
						Home
					</Link>
				</li>
			);
		}

		return [
			<li className="nav-item active" key="home">
				<Link className="nav-link" to="/">
					Home
				</Link>
			</li>,
			<li className="nav-item active" key="surveys">
				<Link className="nav-link" to="/surveys">
					Surveys
				</Link>
			</li>
		];
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<Link className="navbar-brand" to="/">
						MAIL
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">{this.createNavItems()}</ul>
					</div>
					{this.createBtn()}
				</div>
			</nav>
		);
	}
}

export default connect(({ auth }) => ({ auth }), { logout, fetchUser })(Header);
