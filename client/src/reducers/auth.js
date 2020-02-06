export default (state = false, { type, payload }) => {
	if (type === "AUTH") {
		return payload.data.login;
	}

	return state;
};
