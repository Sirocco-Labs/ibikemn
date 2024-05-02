import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PublicUserNavTabs from "../components/PublicUserNavTabs/PublicUserNavTabs";
import StaffUserNavTabs from "../components/StaffUserNavTabs/StaffUserNavTabs";
import AuthNavTabs from "../components/AuthNavTabs/AuthNavTabs";
import AdminUserNavTabs from "../components/AdminUserNavTabs/AdminUserNavTabs";

import SplashScreen from "../screens/SplashScreen";

import { supabase } from "../services/supabase/supabase";
import { getUserQuery } from "../redux/thunks/userThunk";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import { backgroundLocationTask } from "../tasks/BackgroundLocationTaskManager";

function App() {
	const dispatch = useDispatch();
	const [authenticated, setAuthenticated] = useState("");
	const [userSession, setUserSession] = useState("");
	const [loading, setLoading] = useState(true);

	const user = useSelector((store) => store.user);

	useEffect(() => {
		backgroundLocationTask(dispatch);
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
				dispatch(getUserQuery(session.user.id));
				setAuthenticated(session.user.aud);
				setLoading(false);
				// handle sign in event
			} else if (event === "SIGNED_OUT") {
				setLoading(false);
				setAuthenticated(session?.user.aud);
				// handle sign out event
			} else if (event === "PASSWORD_RECOVERY") {
				setLoading(false);
				setAuthenticated(session.user.aud);
				// handle password recovery event
			} else if (event === "TOKEN_REFRESHED") {
				setLoading(false);
				setAuthenticated(session.user.aud);
				// handle token refreshed event
			} else if (event === "USER_UPDATED") {
				setLoading(false);
				setAuthenticated(session.user.aud);
				// handle user updated event
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	if (loading && !authenticated) {
		return <SplashScreen />;
	}
	else {
		if (user.username === 'finish_set_up' && authenticated) {
			return <CreateProfileScreen />;
		} else {
			if (user.is_public && authenticated) {
				return <PublicUserNavTabs />;
			} else if (user.is_employee && authenticated) {
				return <StaffUserNavTabs />;
			} else if (user.is_admin && authenticated) {
				return <AdminUserNavTabs />;
			} else {
				return <AuthNavTabs />;
			}
		}
	}
}

export default App;
