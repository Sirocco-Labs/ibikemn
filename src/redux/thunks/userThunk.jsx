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
