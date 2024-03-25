import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	login: {
		error: null,
		success: null,
		loading: null,
		message: "",
	},
	registration: {
		error: null,
		success: null,
		loading: null,
		message: "",
	},
	user: {
		error: null,
		success: null,
		loading: null,
		message: "",
	},
	commute: {
		error: null,
		success: null,
		loading: null,
		message: "",
	},
	tracking: {
		error: null,
		success: null,
		loading: null,
		message: "",
	},
	calendar: {
		error: null,
		success: null,
		loading: null,
		message: "",
	},
	incentive: {
		error: null,
		success: null,
		loading: null,
		message: "",
	},
	survey: {
		error: null,
		success: null,
		loading: null,
		message: "",
	},
	strava: {
		error: null,
		success: null,
		loading: null,
		message: "",
	},
};

const feedbackSlice = createSlice({
	name: "feedback",
	initialState,
	reducers: {
		setLoginError(state, action) {
			state.login.error = action.payload.error;
			state.login.message = action.payload.message;
		},
		setLoginSuccess(state, action) {
			state.login.success = action.payload.success;
			state.login.message = action.payload.message;
		},
		clearLoginFeedback(state) {
			state.login = initialState.login;
		},
		setRegistrationError(state, action) {
			state.registration.error = action.payload.error;
			state.registration.message = action.payload.message;
		},
		setRegistrationSuccess(state, action) {
			state.registration.success = action.payload.success;
			state.registration.message = action.payload.message;
		},
		clearRegistrationFeedback(state) {
			state.registration = initialState.registration;
		},
		setUserError(state, action) {
			state.user.error = action.payload.error;
			state.user.message = action.payload.message;
		},
		setUserSuccess(state, action) {
			state.user.success = action.payload.success;
			state.user.message = action.payload.message;
		},
		clearUserFeedback(state) {
			state.user = initialState.user;
		},
		setCommuteError(state, action) {
			state.commute.error = action.payload.error;
			state.commute.message = action.payload.message;
		},
		setCommuteSuccess(state, action) {
			state.commute.success = action.payload.success;
			state.commute.message = action.payload.message;
		},
		clearCommuteFeedback(state) {
			state.commute = initialState.commute;
		},
		setTrackingError(state, action) {
			state.tracking.error = action.payload.error;
			state.tracking.message = action.payload.message;
		},
		setTrackingSuccess(state, action) {
			state.tracking.success = action.payload.success;
			state.tracking.message = action.payload.message;
		},
		clearTrackingFeedback(state) {
			state.tracking = initialState.tracking;
		},
		setCalendarError(state, action) {
			state.calendar.error = action.payload.error;
			state.calendar.message = action.payload.message;
		},
		setCalendarSuccess(state, action) {
			state.calendar.success = action.payload.success;
			state.calendar.message = action.payload.message;
		},
		clearCalendarFeedback(state) {
			state.calendar = initialState.calendar;
		},
		setIncentiveError(state, action) {
			state.incentive.error = action.payload.error;
			state.incentive.message = action.payload.message;
		},
		setIncentiveSuccess(state, action) {
			state.incentive.success = action.payload.success;
			state.incentive.message = action.payload.message;
		},
		clearIncentiveFeedback(state) {
			state.incentive = initialState.incentive;
		},
		setSurveyError(state, action) {
			state.survey.error = action.payload.error;
			state.survey.message = action.payload.message;
		},
		setSurveySuccess(state, action) {
			state.survey.success = action.payload.success;
			state.survey.message = action.payload.message;
		},
		clearSurveyFeedback(state) {
			state.survey = initialState.survey;
		},
		setStravaError(state, action) {
			state.strava.error = action.payload.error;
			state.strava.message = action.payload.message;
		},
		setStravaSuccess(state, action) {
			state.strava.success = action.payload.success;
			state.strava.message = action.payload.message;
		},
		clearStravaFeedback(state) {
			state.strava = initialState.strava;
		},
		clearAllFeedback(state) {
			return { ...state, ...initialState };
		},
	},
});

export const {
	setLoginError,
	setLoginSuccess,
	clearLoginFeedback,
	setRegistrationError,
	setRegistrationSuccess,
	clearRegistrationFeedback,
	setUserError,
	setUserSuccess,
	clearUserFeedback,
	setCommuteError,
	setCommuteSuccess,
	clearCommuteFeedback,
	setTrackingError,
	setTrackingSuccess,
	clearTrackingFeedback,
	setCalendarError,
	setCalendarSuccess,
	clearCalendarFeedback,
	setSurveyError,
	setSurveySuccess,
	clearSurveyFeedback,
	setStravaError,
	setStravaSuccess,
	clearStravaFeedback,
	clearAllFeedback,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
