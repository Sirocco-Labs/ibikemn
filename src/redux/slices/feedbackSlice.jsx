import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	login: {
		error: { value: null, message: "" },
		success: { value: null, message: "" },
		loading: { value: null, message: "" },
	},
	registration: {
		error: { value: null, message: "" },
		success: { value: null, message: "" },
		loading: { value: null, message: "" },
	},
	user: {
		error: { value: null, message: "" },
		success: { value: null, message: "" },
		loading: { value: null, message: "" },
	},
	commute: {
		error: { value: null, message: "" },
		success: { value: null, message: "" },
		loading: { value: null, message: "" },
	},
	tracking: {
		error: { value: null, message: "" },
		success: { value: null, message: "" },
		loading: { value: null, message: "" },
	},
	incentive: {
		error: { value: null, message: "" },
		success: { value: null, message: "" },
		loading: { value: null, message: "" },
	},
	bike: {
		error: { value: null, message: "" },
		success: { value: null, message: "" },
		loading: { value: null, message: "" },
	},
	media: {
		error: { value: null, message: "" },
		success: { value: null, message: "" },
		loading: { value: null, message: "" },
	},
};

const feedbackSlice = createSlice({
	name: "feedback",
	initialState,
	reducers: {
		setFeedback(state, action) {
			const { sliceName, type, details } = action.payload;
			state[sliceName] = {
				...state[sliceName],
				[type]: {
					value: details.value,
					message: details.message || "",
				},
			};
		},
		clearFeedback(state, action) {
			const { sliceName, type } = action.payload;
			state[sliceName] = {
				...state[sliceName],
				[type]: {
					value: null,
					message:"",
				},
			}
		},
		clearAllFeedback(state) {
			return initialState;
		},
	},
});

export const {
	setFeedback,
	clearFeedback,
	clearAllFeedback,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
