import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	resources: [],
};

const resourceMediaSlice = createSlice({
	name: "media",
	initialState,
	reducers: {
		setResourceMedia(state, action) {
			return { ...state, resources: action.payload };
			// state.resources = action.payload;
		},
		clearMediaSlice(state) {
			return initialState;
			// state.resources = initialState.resources;
		},
	},
});

export const { setResourceMedia, clearMediaSlice } = resourceMediaSlice.actions;

export default resourceMediaSlice.reducer;
