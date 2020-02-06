// Frameworks
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

// Components
import Header from "./header";
import Landing from "./landing";
import Surveys from "./surveys";
import RequiredAuth from "./required-auth";
import SurveyForm from "./survey-form";

const App = () => {
	return (
		<Router>
			<div>
				<Header />
				<Route path="/" exact component={Landing} />
				<Route path="/surveys" component={RequiredAuth(Surveys)} />
				<Route path="/survey/form" component={RequiredAuth(SurveyForm)} />
			</div>
		</Router>
	);
};

export default App;
