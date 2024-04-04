import { createSlice } from "@reduxjs/toolkit";

const initialState = {
		follow_up: false,
		marketing: false,
		incentive: false,
		location_tracking: false,
		biometrics: false,
		notifications: false,
};

const preferenceSlice = createSlice({
	name: "preferences",
	initialState,
	reducers: {
		setFollowUpPreferences(state, action) {
			return { ...state, ["follow_up"]: action.payload };
		},
		setMarketingPreferences(state, action) {
			return { ...state, ["marketing"]: action.payload };
		},
		setIncentivesPreferences(state, action) {
			return { ...state, ["incentive"]: action.payload };
		},
		setLocationPreferences(state, action) {
			return { ...state, ["location_tracking"]: action.payload };
		},
		setBiometricsPreferences(state, action) {
			return { ...state, ["biometrics"]: action.payload };
		},
		setNotificationPreferences(state, action) {
			return { ...state, ["notifications"]: action.payload };
		},
        setAllPreferences(state, action){
            return {...state, ...action.payload}

        },
		clearAllPreferences(state) {
			return { ...state, ...initialState };
		},
	},
});

export const {
	setFollowUpPreferences,
	setMarketingPreferences,
	setIncentivesPreferences,
	setLocationPreferences,
	setBiometricsPreferences,
	setNotificationPreferences,
    setAllPreferences,
	clearAllPreferences,
} = preferenceSlice.actions;

export default preferenceSlice.reducer;






