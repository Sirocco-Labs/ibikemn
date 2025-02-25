import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PublicUserNavTabs from "../components/PublicUserNavTabs/PublicUserNavTabs";
import StaffUserNavTabs from "../components/StaffUserNavTabs/StaffUserNavTabs";
import AuthNavTabs from "../components/AuthNavTabs/AuthNavTabs";

import SplashScreen from "../screens/SplashScreen";

import { supabase } from "../services/supabase/supabase";
import { getUserQuery } from "../redux/thunks/userThunk";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import { backgroundLocationTask } from "../tasks/BackgroundLocationTaskManager";
import { InitialLocationPermissionRequest } from "../tasks/RequestLocationPermission";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as ExpLinking from "expo-linking";

function App() {
	const dispatch = useDispatch();
	const [authenticated, setAuthenticated] = useState("");
	const [loading, setLoading] = useState(true);
	const user = useSelector((store) => store.user);

	useEffect(() => {
		console.log("APP LOADED");
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			console.log(
				"Auth State:",
				"  event: ",
				event,
				" session: ",
				session
			);
			if (event === "INITIAL_SESSION") {
				dispatch(getUserQuery(session?.user.id));
				setAuthenticated(session?.user.aud);
				setLoading(false);
				// handle initial session
			} else if (event === "SIGNED_IN") {
				console.log("$&$ -------------> SIGNED IN!");
				dispatch(getUserQuery(session.user.id));
				setAuthenticated(session.user.aud);
				setLoading(false);
				// handle sign in event
			} else if (event === "SIGNED_OUT") {
				console.log("$&$ -------------> SIGNED OUT!");
				setLoading(false);
				setAuthenticated(session?.user.aud);
				// handle sign out event
			} else if (event === "PASSWORD_RECOVERY") {
				console.log("$&$ -------------> PASSWORD RECOVERY!");
				dispatch(getUserQuery(session?.user.id));

				setLoading(false);
				setAuthenticated(session.user.aud);
				console.log("$&$ session", session.user.aud);

				// handle password recovery event
			} else if (event === "TOKEN_REFRESHED") {
				console.log("$&$ -------------> TOKEN REFRESHED!");
				setLoading(false);
				setAuthenticated(session.user.aud);
				// handle token refreshed event
			} else if (event === "USER_UPDATED") {
				console.log("$&$ -------------> USER UPDATED!");
				setLoading(false);
				setAuthenticated(session.user.aud);
				// handle user updated event
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	const url = ExpLinking.useURL();
	const createSessionFromUrl = async (url) => {
		const { params, errorCode } = QueryParams.getQueryParams(url);

		if (errorCode) throw new Error(errorCode);
		const { access_token, refresh_token } = params;

		if (!access_token) return;

		const { data, error } = await supabase.auth.setSession({
			access_token,
			refresh_token,
		});
		if (error) throw error;
		return data.session;
	};

	if (url) createSessionFromUrl(url);

	if (loading && !authenticated) {
		return <SplashScreen />;
	} else if (user.username === "finish_set_up" && authenticated) {
		return <CreateProfileScreen />;
	} else if ((user.is_employee || user.is_admin) && authenticated) {
		return <StaffUserNavTabs />;
	} else {
		return <PublicUserNavTabs />;
	}
}

export default App;
