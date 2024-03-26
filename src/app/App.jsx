import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PublicUserNavTabs from "../components/PublicUserNavTabs/PublicUserNavTabs";
import StaffUserNavTabs from "../components/StaffUserNavTabs/StaffUserNavTabs";
import AuthNavTabs from "../components/AuthNavTabs/AuthNavTabs";
import AdminUserNavTabs from "../components/AdminUserNavTabs/AdminUserNavTabs";

import SplashScreen from "../screens/SplashScreen";

import { supabase } from "../services/supabase/supabase";
import { getUserQuery } from "../redux/thunks/userThunk";

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
				setLoading(false);
				setAuthenticated(session?.user.aud);
				// handle initial session
			} else if (event === "SIGNED_IN") {
				setLoading(false);
				setAuthenticated(session.user.aud);
				dispatch(getUserQuery(session.user.id));
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
	} else {
		if (user.is_public) {
			return <PublicUserNavTabs />;
		} else if (user.is_staff) {
			return <StaffUserNavTabs />;
		} else if (user.is_admin) {
			return <AdminUserNavTabs />;
		} else {
			return <AuthNavTabs />;
		}
	}
}

export default App;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	mainView: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		padding: "15px",
	},
	flexCol: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 15,
	},
	flexRow: {
		flex: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginTop: 15,
	},
	bigText: { fontSize: 50 },
	medText: { fontSize: 30 },
	regText: { fontSize: 14 },
	button: {
		display: "flex",
		alignItems: "center",
		border: "1px solid transparent",
		borderRadius: "8px",
		fontSize: 15,
		width: "75%",
		marginTop: "20px",
		marginBottom: "10px",
		padding: "10px",
	},

	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: "100%",
	},
});
