export default (state = {}, { type, payload }) => {
	if (type === "FETCH_USER") {
		return { ...state, ...payload.data };
	}

	return state;
};
