import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	resources:[]
};

const resourceMediaSlice = createSlice({
	name: "media",
	initialState,
	reducers: {
		setResourceMedia(state, action) {
			return { ...state, resources: action.payload };
		},
		clearMediaSlice(state) {
			return { ...state, ...initialState };
		},
	},
});

export const { setResourceMedia, clearMediaSlice } = resourceMediaSlice.actions;

export default resourceMediaSlice.reducer;
