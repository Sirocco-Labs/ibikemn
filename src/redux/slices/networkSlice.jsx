import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isConnected: true,
	queuedActions: [],
};
const networkSlice = createSlice({
	name: "network",
	initialState,
	reducers: {
		setNetworkStatus(state, action) {
			return {...state, isConnected: action.payload}
		},
		queueAction(state, action) {
            return {
				...state,
				queuedActions: [...state.queuedActions, action.payload],
			};
		},
		clearQueuedActions(state) {
            return { ...state, queuedActions:[] };
		},
	},
});

export const { setNetworkStatus, queueAction, clearQueuedActions } =
	networkSlice.actions;
export default networkSlice.reducer;