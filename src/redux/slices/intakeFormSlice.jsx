import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: { username: "", first_name: "", last_name: "", age: false },
	homeAddress: { city: "", state: "", zip: "" },
	workAddress: { city: "", state: "", zip: "" },
	screening: {
		how_did_you_hear: 0,
		commute_frequency: 0,
		bike_confidence: 0,
		staff_identity: null,
		org_identity: 'N/A',
		admin_identity: null,
	},
	demographics: {
		age: "",
		gender_identity: "",
		race: [],
		income_level: "",
		zip_code: "",
	},
	consents: {
		follow_up: null,
		marketing: null,
		location_tracking: null,
	},
	secret: false,
};

const intakeFormSlice = createSlice({
	name: "intake",
	initialState,
	reducers: {
		setIntakeUserInfo(state, action) {
			return { ...state, userInfo: action.payload };
		},
		setIntakeHomeAddress(state, action) {
			return { ...state, homeAddress: action.payload };
		},
		setIntakeWorkAddress(state, action) {
			return { ...state, workAddress: action.payload };
		},
		setIntakeScreening(state, action) {
			return { ...state, screening: action.payload };
		},
		setIntakeDemographics(state, action) {
			return { ...state, demographics: action.payload };
		},
		setIntakeConsents(state, action) {
			return { ...state, consents: action.payload };
		},
		setIntakeSecret(state, action) {
			return { ...state, secret: action.payload };
		},
		setOrg(state, action) {
			return {
				...state,
				screening: { ...initialState.screening},
				secret:false
			};
		},
		clearIntakeSlice(state) {
			return initialState;
		},
		// setIntakeUserInfo(state, action) {
		// 	state.userInfo = action.payload;
		// },
		// setIntakeHomeAddress(state, action) {
		// 	state.homeAddress = action.payload;
		// },
		// setIntakeWorkAddress(state, action) {
		// 	state.workAddress = action.payload;
		// },
		// setIntakeScreening(state, action) {
		// 	state.screening = action.payload;
		// },
		// setIntakeDemographics(state, action) {
		// 	state.demographics = action.payload;
		// },
		// setIntakeConsents(state, action) {
		// 	state.consents = action.payload;
		// },
		// setIntakeSecret(state, action) {
		// 	state.secret = action.payload;
		// },
		// clearIntakeSlice(state) {
		// 	Object.assign(state, initialState);
		// },
	},
});

export const {
	setIntakeUserInfo,
	setIntakeHomeAddress,
	setIntakeWorkAddress,
	setIntakeScreening,
	setIntakeDemographics,
	setIntakeConsents,
	clearIntakeSlice,
	setIntakeSecret,
	setOrg,
} = intakeFormSlice.actions;

export default intakeFormSlice.reducer;
