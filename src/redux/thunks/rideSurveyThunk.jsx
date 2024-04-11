import { supabase } from "../../services/supabase/supabase";

import { setRideSurveyHistory } from "../slices/rideSurveySlice";

export const getAllRideSurveys = () => async (dispatch) => {
	console.log("IN RIDE SURVEY THUNK ---> getAllRideSurveys(): ");
	try {
		const getAllRideSurveys = await supabase
			.from("ride_survey_junction")
			.select("*");
		if (getAllRideSurveys.error) {
			console.log(
				"SUPABASE GET ALL USER RIDES SURVEY ERROR!!:",
				getAllRideSurveys.error
			);
		} else {
			console.log(
				"SUPABASE GET ALL USER RIDES SURVEY SUCCESS!!:",
				getAllRideSurveys.data
			);
			// dispatch(setAllRideSurveys(getAllRideSurveys.data))
		}
	} catch (error) {
		console.log(
			" RIDE SURVEY THUNK ERROR ---> getAllRideSurveys():",
			error
		);
	}
};
export const getMyRideSurveys = (user_id) => async (dispatch) => {
	console.log(
		"IN RIDE SURVEY THUNK ---> getMyRideSurveys(user_id): ",
		user_id
	);
	try {
		const getUserSurveys = await supabase
			.from("ride_survey_junction")
			.select("*")
			.eq("user_id", user_id)
			.order("id", { descending: true });
		if (getUserSurveys.error) {
			console.log(
				"SUPABASE GET USER RIDE SURVEY ERROR!!:",
				getUserSurveys.error
			);
		} else {
			console.log(
				"SUPABASE GET USER RIDE SURVEY SUCCESS!!:",
				getUserSurveys.status
			);
			const rideSurveys = getUserSurveys.data;
			dispatch(setRideSurveyHistory(rideSurveys));
		}
	} catch (error) {
		console.log(" RIDE SURVEY THUNK ERROR ---> (user_id):", error);
	}
};
export const addRideSurvey = (surveyData) => async (dispatch) => {
	console.log(
		"IN RIDE SURVEY THUNK ---> addRideSurvey(surveyData): ",
		surveyData
	);
	const { user_id } = surveyData;

	try {
		const surveyInsert = await supabase
			.from("ride_survey_junction")
			.insert(surveyData);
		if (surveyInsert.error) {
			console.log(
				"SUPABASE ADD RIDE SURVEY ERROR!! :",
				surveyInsert.error
			);
		} else {
			console.log(
				"SUPABASE ADD RIDE SURVEY SUCCESS!! :",
				surveyInsert.status
			);
			dispatch(getMyRideSurveys(user_id));
		}
	} catch (error) {
		console.log(
			" RIDE SURVEY THUNK ERROR ---> addRideSurvey(surveyData):",
			error
		);
	}
};
