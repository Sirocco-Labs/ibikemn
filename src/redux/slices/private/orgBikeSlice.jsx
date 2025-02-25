import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const orgBikeSlice = createSlice({
	name: "orgBikes",
	initialState,
	reducers: {
		setOrgBikes(state, action) {
			return action.payload
		},
		clearOrgBikes(state) {
			return initialState;
		},
	},
});

export const { setOrgBikes, clearOrgBikes } = orgBikeSlice.actions;

export default orgBikeSlice.reducer;
