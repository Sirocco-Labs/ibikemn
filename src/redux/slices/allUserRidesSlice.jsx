import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allUserRidesSlice = createSlice({
	name: "userRides",
	initialState,
	reducers: {
		setAllUserRides(state, action) {
			return action.payload;
		},
		clearAllUserRides(state) {
			return initialState;
		},
	},
});

export const { setAllUserRides, clearAllUserRides } = allUserRidesSlice.actions;

export default allUserRidesSlice.reducer;
