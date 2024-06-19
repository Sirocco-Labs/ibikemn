import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const orgBikeSlice = createSlice({
	name: "orgBikes",
	initialState,
	reducers: {
		setOrgBikes(state, action) {
			state.length = 0;
			state.push(...action.payload);

			// return (state = action.payload);
		},
		clearOrgBikes(state) {
			state.length = 0;

			// return (state = initialState);
		},
	},
});

export const { setOrgBikes, clearOrgBikes } = orgBikeSlice.actions;

export default orgBikeSlice.reducer;

//     {
// 	id: null,
// 	bike_id: 0,
// 	org_id: 0,
// 	checked_out_by: "",
// 	in_use: null,
// 	check_out_date: "",
// 	return_by: "",
// }
