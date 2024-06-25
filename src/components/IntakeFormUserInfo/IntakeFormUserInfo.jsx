import {
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	View,
	Platform,
	Keyboard,
	StyleSheet,
	Alert,
} from "react-native";
import { Input, Button, Text, CheckBox, Icon } from "@rneui/themed";
import KeyboardAvoidingWrapper from "../KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addUser } from "../../redux/thunks/userThunk";
import { setIntakeUserInfo } from "../../redux/slices/intakeFormSlice";

import KeyboardAvoidingScrollView from "../KeyboardAvoidingScrollView/KeyboardAvoidingScrollView";

export default function IntakeFormUserInfo({ navigation, route }) {
	const dispatch = useDispatch();
	const inputData = {
		username: "",
		first_name: "",
		last_name: "",
		age: false,
	};
	const { index, routeNames } = navigation.getState();
	const tabFocused = route.name === routeNames[index] ? true : false;
	const intake = useSelector((store) => store.intake);

	useEffect(() => {
		setUserInfo(intake.userInfo);
		if (tabFocused && loading && intake.userInfo.username) {
			Alert.alert("Success", "Your user information has been saved.");
			setLoading(false);
		}
	}, [intake]);

	const [userInfo, setUserInfo] = useState(inputData);
	const [loading, setLoading] = useState(false);

	const handleSave = () => {
		dispatch(setIntakeUserInfo(userInfo));
		setLoading(!loading);
	};
	const validateSave = () => {
		if (userInfo.username && userInfo.first_name && userInfo.last_name) {
			if (userInfo.age) {
				return false;
			}
		}
		return true;
	};

	const handleJumpTo = () => {
		navigation.jumpTo("Address");
	};

	return (
		<KeyboardAvoidingScrollView>
			<View style={styles.flexOne}>
				<View style={styles.section}>
					<View>
						<Input
							label="Username"
							placeholder="Choose a username"
							inputStyle={styles.input}
							labelStyle={styles.label}
							value={userInfo.username}
							onChangeText={(text) =>
								setUserInfo({ ...userInfo, username: text })
							}
						/>
					</View>

					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<Input
								label="First Name"
								placeholder="First Name"
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={userInfo.first_name}
								onChangeText={(text) =>
									setUserInfo({
										...userInfo,
										first_name: text,
									})
								}
							/>
						</View>
						<View style={styles.gridItem}>
							<Input
								label="Last Name"
								placeholder="Last Name"
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={userInfo.last_name}
								onChangeText={(text) =>
									setUserInfo({
										...userInfo,
										last_name: text,
									})
								}
							/>
						</View>

						<View>
							<CheckBox
								checked={userInfo.age}
								onPress={() =>
									setUserInfo({
										...userInfo,
										age: !userInfo.age,
									})
								}
								iconRight
								title="I am at least 15 years old"
								containerStyle={{
									backgroundColor: "transparent",
								}}
							/>
						</View>
					</View>
				</View>
				<View style={styles.btnSection}>
					<View style={styles.grid}>
						<Button
							title={"Save"}
							icon={{ name: "save", color: "white" }}
							iconRight
							loading={loading}
							disabled={validateSave()}
							onPress={handleSave}
							buttonStyle={styles.nextBtn}
							// titleStyle={styles.ml15}
						/>

						<Button
							title={"Next"}
							icon={{ name: "arrow-right", color: "white" }}
							iconRight
							disabled={
								validateSave() && !intake.userInfo.username
							}
							onPress={handleJumpTo}
							buttonStyle={styles.nextBtn}
							titleStyle={styles.ml15}
						/>
					</View>
				</View>
			</View>
		</KeyboardAvoidingScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		padding: 15,
		marginTop: 5,
		backgroundColor: "#fff",
	},
	flexOne: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "space-between",
		paddingTop: 15,
	},
	section: {
		paddingHorizontal: 5,
		marginTop: 5,
		marginBottom: 5,
	},
	btnSection: {
		paddingHorizontal: 5,
		marginBottom: 15,
	},
	sectionTitle: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10,
	},

	input: {
		// fontSize: 12,
		// marginVertical: -2,
	},
	label: {
		// fontSize: 13,
		// marginBottom: -5,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		width: "100%",
		// borderColor:'lime',
		// borderWidth:3
	},
	gridItem: {
		width: "50%",
		padding: 1,
	},
	nextBtn: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: 120,
		borderRadius: 12,
		backgroundColor: "#1269A9",
	},
	backBtn: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: 100,
	},
	ml15: {
		marginLeft: 15,
	},
	mr15: {
		marginRight: 15,
	},
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 40,
		padding: 2,
	},
	solidButtonOff: {
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 40,
		padding: 2,
	},
	outlineButton: {
		borderWidth: 1.5,
		borderColor: "#1269A9",
		borderRadius: 12,
		height: 40,
		padding: 2,
	},
	outlineButtonOff: {
		borderWidth: 1.5,
		borderColor: "#C0C0C0",
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 40,
		padding: 2,
	},
});
