import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allBikesSlice = createSlice({
	name: "allBikes",
	initialState,
	reducers: {
		setAllBikes(state, action) {
		return (state = action.payload);

		},
		clearAllBikes(state) {
			return state = initialState
		},
	},
});

export const { setAllBikes, clearAllBikes } = allBikesSlice.actions;

export default allBikesSlice.reducer;

// {
// 	id: null,
// 	bike_id: 0,
// 	org_id: 0,
// 	checked_out_by: "",
// 	in_use: null,
// 	check_out_date: "",
// 	return_by: "",
// }
