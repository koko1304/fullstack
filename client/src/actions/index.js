// Frameworks
import axios from "axios";

export const isLogin = () => async dispatch =>
	// Please checking in package.json file
	// we have set up proxy whenever any link match /auth/* so we will
	// send user to domain http://localhost:8080/auth/islogin instead of real domain
	dispatch({
		type: "AUTH",
		payload: await axios.get("/auth/islogin")
	});

export const logout = () => async dispatch =>
	// Please checking in package.json file
	// we have set up proxy whenever any link match /auth/* so we will
	// send user to domain http://localhost:8080/auth/logout instead of real domain
	dispatch({
		type: "AUTH",
		payload: await axios.get("/auth/logout")
	});

export const recordToken = token => async dispatch =>
	// Please checking in package.json file
	// we have set up proxy whenever any link match /api/* so we will
	// send user to domain http://localhost:8080/api/stripe instead of real domain

	// Send token id back to the server to start charge process
	dispatch({
		type: "FETCH_USER",
		payload: await axios.post("/api/stripe", { stripeTokenId: token.id })
	});

export const fetchUser = () => async dispatch =>
	dispatch({
		type: "FETCH_USER",
		payload: await axios.get("/api/user")
	});
