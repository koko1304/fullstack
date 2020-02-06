// Frameworks
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

// Components
import App from "./components/app";

// Combine Reducers
import combineReducers from "./reducers";

// Action Creators
import { isLogin } from "./actions";

// Create Redux Store
const store = createStore(combineReducers, applyMiddleware(reduxThunk));

// Checking for user login
const checkLogin = store.dispatch(isLogin());

checkLogin.then(() => {
	// Render to the selected element
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.querySelector("#root")
	);
});
