import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active:[],
    history:[],
    progress:[],
	allPrevious:[],
    updated:true,
    last_updated:'',
	reward:[],
	showRewardDialog:true,
	completed:0
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
		setRewardStatus(state, action) {
			return { ...state, reward: action.payload };
		},
		setShowRewardDialog(state, action) {
			return { ...state, showRewardDialog: action.payload };
		},
		setCompletedChallenges(state, action){
			return{...state, completed:action.payload}
		},
		clearIncentiveSlice(state) {
			return initialState;
		},
		// setActiveIncentives(state, action) {
		// 	state.active = action.payload;
		// },
		// setIncentivesHistory(state, action) {
		// 	state.history = action.payload;
		// },
		// setIncentivesProgress(state, action) {
		// 	state.progress = action.payload;
		// },
		// setAllPreviousIncentives(state, action) {
		// 	state.allPrevious = action.payload;
		// },
		// setIsProgressUpdated(state, action) {
		// 	state.updated = action.payload;
		// },
		// setTimeOfProgressUpdate(state, action) {
		// 	state.last_updated = action.payload;
		// },
		// clearIncentiveSlice(state) {
		// 	Object.assign(state, initialState);
		// },
	},
});

export const {
	setActiveIncentives,
	setIncentivesHistory,
	setIncentivesProgress,
	setAllPreviousIncentives,
	setIsProgressUpdated,
	setTimeOfProgressUpdate,
	setRewardStatus,
	setShowRewardDialog,
	setCompletedChallenges,
	clearIncentiveSlice,
} = incentiveSlice.actions;

export default incentiveSlice.reducer;
