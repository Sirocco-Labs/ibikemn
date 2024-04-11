import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const rideSurveys = createSlice({
	name: "rideSurveys",
	initialState,
	reducers: {
		setRideSurveyHistory(state, action) {
			return action.payload
		},
		clearRideSurveyHistory(state) {
			return initialState
		},
	},
});

export const { setRideSurveyHistory, clearRideSurveyHistory } = rideSurveys.actions;

export default rideSurveys.reducer;
