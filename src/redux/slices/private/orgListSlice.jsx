import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const orgListSlice = createSlice({
	name: "orgList",
	initialState,
	reducers: {
		setOrgList(state, action) {
			return action.payload;
		},
		clearOrgList(state) {
			return initialState;
		},
	},
});

export const { setOrgList, clearOrgList } = orgListSlice.actions;

export default orgListSlice.reducer;
