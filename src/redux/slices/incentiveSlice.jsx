import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active:[],
    history:[],
    progress:[],
	allPrevious:[],
    updated:true,
    last_updated:''


}

const incentiveSlice = createSlice({
	name: "incentives",
	initialState,
	reducers: {
		setActiveIncentives(state, action) {
			return { ...state, active: action.payload };
		},
		setIncentivesHistory(state, action) {
			return { ...state, history: action.payload };
		},
		setIncentivesProgress(state, action) {
			return { ...state, progress: action.payload };
		},
		setAllPreviousIncentives(state, action) {
			return { ...state, allPrevious: action.payload };
		},
		setIsProgressUpdated(state, action) {
			return { ...state, updated: action.payload };
		},
		setTimeOfProgressUpdate(state, action) {
			return { ...state, last_updated: action.payload };
		},
		clearIncentiveSlice(state) {
			return initialState;
		},
	},
});

export const {
	setActiveIncentives,
	setIncentivesHistory,
	setIncentivesProgress,
	setAllPreviousIncentives,
	setIsProgressUpdated,
    setTimeOfProgressUpdate,
	clearIncentiveSlice,
} = incentiveSlice.actions;

export default incentiveSlice.reducer;
