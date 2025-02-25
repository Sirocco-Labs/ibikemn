import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allBikesSlice = createSlice({
	name: "allBikes",
	initialState,
	reducers: {
		setAllBikes(state, action) {
			return action.payload;
		},
		clearAllBikes(state) {
			return initialState
		},
	},
});

export const { setAllBikes, clearAllBikes } = allBikesSlice.actions;

export default allBikesSlice.reducer;
