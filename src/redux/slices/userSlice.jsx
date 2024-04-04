import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: null,
	username: "",
	user_id: "",
	first_name: "",
	last_name: "",
	is_admin: null,
	is_connected_account: null,
	is_consent_to_survey: null,
	is_employee: null,
	is_incentive_participant: null,
	is_public: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			return { ...state, ...action.payload };
		},
		clearUserData(state) {
			return { ...state, ...initialState };
		},
	},
});

export const { setUser, clearUserData } = userSlice.actions;

export default userSlice.reducer;
