import { supabase } from "../../services/supabase/supabase";
// import { clearFeedback, setError, setSuccess } from "../slices/feedbackSlice";
import { setUser, clearUserData } from "../slices/userSlice";

export const getUserQuery = (id) => async (dispatch) => {
	console.log("IN USER THUNK ----> getUserQuery(id): ", id);
	try {
		const response = await supabase
			.from("users")
			.select(`*`)
			.eq("user_id", id)
			.single();
		if (response.error) {
			console.log("SUPABASE GET USER ERROR!: ", response.error);
		} else {
			console.log("SUPABASE GET USER SUCCESS!: ", response.data);
			await dispatch(setUser(response.data));
		}
	} catch (error) {
		console.log("USER THUNK ERROR --> getUserQuery(id): ", error);
	}
};

export const addUser = (userData) => async (dispatch) => {
	console.log("IN USER THUNK ----> addUser(userData) :", userData);
	try {
		const response = await supabase.from("users").insert(userData);
		if (response.error) {
			console.log("SUPABASE ADD USER ERROR!: ", response.error);
		} else {
			console.log("SUPABASE ADD USER SUCCESS!: ", response.data);
			await dispatch(getUserQuery(userData.user_id));
		}
	} catch (error) {
		console.log("USER THUNK ERROR --> addUser(): ", error);
	}
};

export const finishProfile = (userData) => async (dispatch) => {
	console.log("IN USER THUNK ----> finishProfile(userData) :", userData);
	let public_identity = true;
	let userUpdateData;
	const {
		userInfo,
		homeAddress,
		workAddress,
		screening,
		demographics,
		consents,
		id,
		user_id,
	} = userData;

	const { username, first_name, last_name } = userInfo;

	const home = { ...homeAddress, location_category: 1, user_id: user_id };
	const work = { ...workAddress, location_category: 2, user_id: user_id };

	const {
		admin_identity,
		staff_identity,
		org_identity,
		how_did_you_hear,
		commute_frequency,
		bike_confidence,
	} = screening;

	const { age, gender_identity, race, income } = demographics;

	const raceString = race
		.toString()
		.replaceAll(" ,", ",")
		.replaceAll(",", ", ");

	const { incentive, follow_up } = consents;

	if (admin_identity || staff_identity) {
		public_identity = false;
	}

	const screeningData = {
		user_id,
		how_did_you_hear,
		commute_frequency,
		bike_confidence,
	};
	const demographicData = {
		user_id,
		age,
		gender_identity,
		race: raceString,
		income,
		zip_code: home.zip,
	};
	const employeeData = {
		user_id,
		organization: org_identity,
	};

	if (public_identity) {
		userUpdateData = {
			username: username,
			first_name: first_name,
			last_name: last_name,
			is_admin: admin_identity,
			is_employee: staff_identity,
			is_public: public_identity,
			is_consent_to_survey: follow_up,
			is_incentive_participant: incentive,
		};
	}
	if (staff_identity) {
		userUpdateData = {
			username: username,
			first_name: first_name,
			last_name: last_name,
			is_admin: admin_identity,
			is_employee: staff_identity,
			org_id: org_identity,
			is_public: public_identity,
			is_consent_to_survey: follow_up,
			is_incentive_participant: incentive,
		};
	}


	try {
		// -------------------------- USER UPDATE
		const userUpdate = await supabase
			.from("users")
			.update(userUpdateData)
			.match({ id });
		// ------------
		if (userUpdate.error) {
			console.log("SUPABASE USER UPDATE ERROR!: ", userUpdate.error);
		} else {
			console.log("SUPABASE USER UPDATE SUCCESS!: ", userUpdate.data);
			await dispatch(getUserQuery(user_id));
		}

		// ------------------------ SCREENING INSERT
		const screeningInsert = await supabase
			.from("screening_data_junction")
			.insert(screeningData);
		// ------------
		if (screeningInsert.error) {
			console.log(
				"SUPABASE SCREENING INSERT ERROR!: ",
				screeningInsert.error
			);
		} else {
			console.log(
				"SUPABASE SCREENING INSERT SUCCESS!: ",
				screeningInsert.data
			);
		}

		// ------------------------- ADDRESS INSERT
		const addressesInsert = await supabase
			.from("addresses_junction")
			.insert([home, work]);
		// ------------
		if (addressesInsert.error) {
			console.log(
				"SUPABASE ADDRESS INSERT ERROR!: ",
				addressesInsert.error
			);
		} else {
			console.log(
				"SUPABASE ADDRESS INSERT SUCCESS!: ",
				addressesInsert.data
			);
		}

		// ------------------------ DEMOGRAPHIC INSERT
		const demographicInsert = await supabase
			.from("demographics_data_junction")
			.insert(demographicData);

		// ------------
		if (demographicInsert.error) {
			console.log(
				"SUPABASE DEMOGRAPHIC INSERT ERROR!: ",
				demographicInsert.error
			);
		} else {
			console.log(
				"SUPABASE DEMOGRAPHIC INSERT SUCCESS!: ",
				demographicInsert.data
			);
		}
		if (staff_identity) {
			// --------------------------- EMPLOYEE INSERT
			const employeeInsert = await supabase
				.from("employee_data_junction")
				.insert(employeeData);
			// ------------
			if (employeeInsert.error) {
				console.log(
					"SUPABASE EMPLOYEE INSERT ERROR!: ",
					employeeInsert.error
				);
			} else {
				console.log(
					"SUPABASE EMPLOYEE INSERT SUCCESS!: ",
					employeeInsert.data
				);
			}
		}
	} catch (error) {
		console.log("USER THUNK ERROR --> createProfile(): ", error);
	}
};
