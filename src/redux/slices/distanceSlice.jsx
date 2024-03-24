import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	history: [],
	location: {
		current: null,
		previous: null,
	},
	total: 0,
	is_tracking: false,
};

const distanceSlice = createSlice({
	name: "distance",
	initialState,
	reducers: {
		setTotalDistance(state, action) {
			state.total += action.payload;
		},
		setLocationCoordinates(state, action) {
			state.history.push(action.payload);
			state.location.previous = state.location.current;
			state.location.current = action.payload;
		},
		toggleTrackingStatus(state) {
			state.is_tracking = !state.is_tracking;
		},
		clearDistance(state) {
			return { ...state, ...initialState };
		},
	},
});

export const {
	setTotalDistance,
	setLocationCoordinates,
	toggleTrackingStatus,
	clearDistance,
} = distanceSlice.actions;

export default distanceSlice.reducer;
