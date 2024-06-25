import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allUserRidesSlice = createSlice({
	name: "userRides",
	initialState,
	reducers: {
		setAllUserRides(state, action) {
			state.length = 0;
			state.push(...action.payload);
		},
		clearAllUserRides(state) {
			state.length = 0;
			// return initialState;
		},
	},
});

export const { setAllUserRides, clearAllUserRides } = allUserRidesSlice.actions;

export default allUserRidesSlice.reducer;
