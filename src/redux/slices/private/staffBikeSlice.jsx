import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: null,
	bike_id: 0,
	org_id: 0,
	checked_out_by: "",
	in_use: null,
	check_out_date: "",
	return_by: "",
};

const staffBikeSlice = createSlice({
	name: "myBike",
	initialState,
	reducers: {
		setMyBike(state, action) {
			return {...state, ...action.payload}
		},
		clearMyBike(state) {
			return {...state ,  ...initialState}
		},
	},
});

export const { setMyBike, clearMyBike } = staffBikeSlice.actions;

export default staffBikeSlice.reducer;

