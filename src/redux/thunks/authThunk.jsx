import { supabase } from "../../services/supabase/supabase";
import { getUserQuery, addUser } from "./userThunk";
import { clearUserData } from "../slices/userSlice";
import { setIntakeSecret } from "../slices/intakeFormSlice";
import { setFeedback } from "../slices/feedbackSlice";

export const emailSignUp = (regData) => async (dispatch) => {
	console.log("IN AUTH THUNK ----> emailSignUp(regData): ", regData);
	const { email, password, username, first_name, last_name } = regData;
	const credentials = { email, password };
	try {
		const response = await supabase.auth.signUp(credentials);
		if (response.error) {
			console.log("SUPABASE REGISTER ERROR!: ", response.error);
		} else {
			console.log("SUPABASE REGISTER SUCCESS!: ", response.data);
			const user_id = response.data.user.id;
			const user_info = {
				user_id: response.data.user.id,
				email: response.data.user.email,
			};
			await dispatch(addUser(user_info));
			await dispatch(loginUser(credentials));
		}
	} catch (error) {
		console.log("AUTH THUNK ERROR --> emailSignUp(): ", error);
	}
};

export const loginUser = (credentials) => async (dispatch) => {
	console.log("IN AUTH THUNK ----> loginUser(credentials): ", credentials);
	try {
		const response = await supabase.auth.signInWithPassword(credentials);
		if (response.error) {
			console.log("SUPABASE LOGIN ERROR!: ", response.error.message);
			const feedback = {
				sliceName: "login",
				type: "error",
				details: {
					value: true,
					message: "Invalid login credentials",
				},
			};
			dispatch(setFeedback(feedback));
		} else {
			console.log("SUPABASE LOGIN SUCCESS!: ", response.data);
			const id = response.data.user.id;
			await dispatch(getUserQuery(id));
		}
	} catch (error) {
		console.log("AUTH THUNK ERROR --> loginUser():", error);
	}
};

export const logoutUser = () => async (dispatch) => {
	console.log("IN AUTH THUNK ----> logoutUser()");
	try {
		await dispatch(clearUserData());
		const response = await supabase.auth.signOut();
		if (response.error) {
			console.log("SUPABASE LOGOUT ERROR!: ", response.error.message);
		} else {
			await dispatch(clearUserData());
			console.log("SUPABASE LOGOUT SUCCESS!: ", response.status);
		}
	} catch (error) {
		console.log("AUTH THUNK ERROR --> logoutUser(): ", error);
	}
};

export const confirmSecret = (secretCode) => async (dispatch) => {
	try {
		const secret = await supabase.from("secret_code").select("*").single();
		if (secret.error) {
			console.log("SUPABASE SECRET CODE ERROR", secret.error);
		} else {
			console.log("SUPABASE SECRET CODE SUCCESS", secret.data);
			if (secretCode === secret.data.code) {
				dispatch(setIntakeSecret(true));
				const feedback = {
					sliceName: "registration",
					type: "success",
					details: {
						value: true,
						message: "Validation successful",
					},
				};
				dispatch(setFeedback(feedback));
			} else {
				const feedback = {
					sliceName: "registration",
					type: "error",
					details: {
						value: true,
						message: "Oops, that wasn't it!",
					},
				};
				dispatch(setFeedback(feedback));
			}
		}
	} catch (error) {}
};
