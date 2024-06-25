import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: "",
	user_id: "",
	miles_total: 0,
	rides_total: 0,
	commute_miles_total: 0,
	commute_rides_total: 0,
};

const travelStats = createSlice({
	name: "travelStats",
	initialState,
	reducers: {
		setUserTravelStats(state, action) {
			return { ...state, ...action.payload };

			// Object.assign(state, action.payload);
		},
		clearUserTravelStats(state) {
			return initialState;

			// Object.assign(state, initialState);
		},
	},
});

export const { setUserTravelStats, clearUserTravelStats } = travelStats.actions;

export default travelStats.reducer;
