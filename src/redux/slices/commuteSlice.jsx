import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	is_ride_started: false,
	is_survey_open: false,
	is_work_commute:false,
	ride_start_time:'',
	ride_end_time:'',
	ride_id:null,

};

const commuteSlice = createSlice({
	name: "commute",
	initialState,
	reducers: {
		chooseWorkCommute(state){
			return {...state, is_work_commute: true}
			// state.is_work_commute = true;
		},
		setRideStartTime(state, action) {
			return {...state, ride_start_time: action.payload}
			// state.ride_start_time = action.payload
		},
		setRideEndTime(state, action) {
			return {...state, ride_end_time: action.payload}
			// state.ride_end_time = action.payload
		},
		setRideId(state, action) {
			return {...state, ride_id:action.payload}
			// state.ride_id = action.payload
		},
		toggleRideStarted(state) {
			return{...state, is_ride_started:!state.is_ride_started}
			// state.is_ride_started = !state.is_ride_started;
		},
		toggleSurveyOpen(state) {
			return { ...state, is_survey_open: !state.is_survey_open };
			// state.is_survey_open = !state.is_survey_open;
		},
		clearCommuteSlice(state) {
			return initialState;
		},
	},
});

export const {
	chooseWorkCommute,
	setRideStartTime,
	setRideEndTime,
	setRideId,
	toggleRideStarted,
	toggleSurveyOpen,
	clearCommuteSlice,
} = commuteSlice.actions;

export default commuteSlice.reducer;
