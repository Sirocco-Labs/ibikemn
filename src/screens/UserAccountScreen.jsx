import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, Button } from "@rneui/themed";
import { logoutUser } from "../redux/thunks/authThunk";
import { useDispatch } from "react-redux";
import { clearUserData } from "../redux/slices/userSlice";
import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";

export default function UserAccountScreen() {
	const dispatch = useDispatch();
	const clearUserThenLogout = () => {
		dispatch(clearUserData());
		dispatch(logoutUser());
	};
	return (
		<ScreenWrapper background={{ backgroundColor: "#fff" }}>
			<View style={styles.sectionView}>
				<View style={styles.leftColBe}>
					<Text>Preferences</Text>

					<View style={styles.sectionView}>
						<View style={styles.leftColBe}>
							<Text>Settings</Text>
							<Text>Location Services</Text>
							<Text>Notifications</Text>
						</View>
					</View>

					<View style={styles.sectionView}>
						<View style={styles.leftColBe}>
							<Text>Contact BikeMN</Text>
							<Text>email</Text>
						</View>
					</View>

					<View style={styles.sectionView}>
						<View style={styles.leftColBe}>
							<Text>Report a bug</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.sectionView}>
				<Button onPress={clearUserThenLogout}>Logout</Button>
			</View>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
	},
	keeb: {
		flex: 1,
	},
	scroll: {
		flexGrow: 1,
	},
	innerScroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	leftColAr: {
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
	},
	rightColAr: {
		justifyContent: "space-around",
		alignItems: "flex-end",
		width: "100%",
	},
	cenColAr: {
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	leftColBe: {
		justifyContent: "space-between",
		alignItems: "flex-start",
		width: "100%",
	},
	rightColBe: {
		justifyContent: "space-between",
		alignItems: "flex-end",
		width: "100%",
	},
	cenColBe: {
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	mv10: {
		marginVertical: 10,
	},
});
