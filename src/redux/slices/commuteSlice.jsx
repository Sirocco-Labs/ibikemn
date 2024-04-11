import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	is_ride_started: false,
	is_survey_open: false,
	is_work_commute:false,
	ride_start_time:'',
	ride_end_time:''

};

const commuteSlice = createSlice({
	name: "commute",
	initialState,
	reducers: {
		chooseWorkCommute(state){
			state.is_work_commute = true;
		},
		setRideStartTime(state, action) {
			state.ride_start_time = action.payload
		},
		setRideEndTime(state, action) {
			state.ride_end_time = action.payload
		},
		toggleRideStarted(state) {
			state.is_ride_started = !state.is_ride_started;
		},
		toggleSurveyOpen(state) {
			state.is_survey_open = !state.is_survey_open;
		},
		clearCommuteSlice(state) {
			return { ...state, ...initialState };
		},
	},
});

export const {
	chooseWorkCommute,
	setRideStartTime,
	setRideEndTime,
	toggleRideStarted,
	toggleSurveyOpen,
	clearCommuteSlice,
} = commuteSlice.actions;

export default commuteSlice.reducer;
