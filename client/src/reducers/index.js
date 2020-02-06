import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

// Reducers
import Auth from "./auth";
import User from "./user";

export default combineReducers({
	auth: Auth,
	user: User,
	form: formReducer
});
