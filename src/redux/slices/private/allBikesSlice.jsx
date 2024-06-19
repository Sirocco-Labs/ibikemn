import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allBikesSlice = createSlice({
	name: "allBikes",
	initialState,
	reducers: {
		setAllBikes(state, action) {
			state.length = 0;
			state.push(...action.payload);

			// return (state = action.payload);
		},
		clearAllBikes(state) {
			state.length = 0;

			// return (state = initialState);
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
