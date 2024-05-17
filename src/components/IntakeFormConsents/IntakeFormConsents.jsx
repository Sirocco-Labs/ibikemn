import {
	ScrollView,
	StyleSheet,
	View,
	Alert,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Linking,
	Switch,
	Platform,
} from "react-native";
import { Input, Button, Slider, Text } from "@rneui/themed";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIntakeConsents } from "../../redux/slices/intakeFormSlice";
import KeyboardAvoidingScrollView from "../KeyboardAvoidingScrollView/KeyboardAvoidingScrollView";

import { InitialLocationPermissionRequest } from "../../tasks/RequestLocationPermission";
import { clearAllPreferences, setAllPreferences } from "../../redux/slices/preferenceSlice";

export default function IntakeFormConsents({ navigation, route }) {
	const dispatch = useDispatch();
	const inputData = {
		follow_up: false,
		marketing: false,
		incentive: false,
		location_tracking: false,
		biometrics: false,
		notifications: false,
	};
	const toggler = {
		follow_up: false,
		marketing: false,
		incentive: false,
		location_tracking: false,
		biometrics: false,
		notifications: false,
	};

	const [consents, setConsents] = useState(inputData);
	const [value, setValue] = useState(0);
	// const [toggleText, setConsents] = useState(toggler);

	const intake = useSelector((store) => store.intake);
	const preferences = useSelector((store) => store.preferences);

	const { index, routeNames } = navigation.getState();
	const tabFocused = route.name === routeNames[index] ? true : false;

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setConsents(preferences);
		if (tabFocused && loading && intake.consents.location_tracking && preferences.location_tracking) {
			Alert.alert("Success", "Your preferences have been saved.");
			setLoading(false);
		}
	}, [intake]);

	const validateSave = () => {
		if (consents.location_tracking) {
			return false;
		}
		return true;
	};
	const handleSave = () => {
		dispatch(setIntakeConsents(consents));
		dispatch(setAllPreferences(consents))

		setLoading(!loading);
	};

	return (
		<KeyboardAvoidingScrollView>
			<View style={styles.flexOne}>
				<View style={styles.section}>
					<View style={styles.switchLine}>
						<Text>
							I consent to be contacted by BikeMN and/or their
							partners for a testimonial interview about my
							experience using this app
						</Text>

						<View style={styles.switchRight}>
							<Switch
								trackColor={{
									false: "#cccccc",
									true: "#9cb59a",
								}}
								thumbColor={
									consents.follow_up ? "#23ab1a" : "#707070"
								}
								ios_backgroundColor="#3e3e3e"
								value={consents.follow_up}
								onChange={() => {
									setConsents({
										...consents,
										follow_up: !consents.follow_up,
									});
								}}
								onValueChange={() => validateSave()}
							/>
							<Text>{consents.follow_up ? "Yes" : "No"}</Text>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<View style={styles.switchLine}>
						<Text>
							I consent to receiving marketing and/or other
							promotional content from BikeMN
						</Text>

						<View style={styles.switchRight}>
							<Switch
								trackColor={{
									false: "#cccccc",
									true: "#9cb59a",
								}}
								thumbColor={
									consents.marketing ? "#23ab1a" : "#707070"
								}
								ios_backgroundColor="#3e3e3e"
								value={consents.marketing}
								onChange={() =>
									setConsents({
										...consents,
										marketing: !consents.marketing,
									})
								}
								onValueChange={() => validateSave()}
							/>
							<Text>{consents.marketing ? "Yes" : "No"}</Text>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<View style={styles.switchLine}>
						<View style={styles.textBlock}>
							<Text>
								The iBikeMN app gives its users full control
								over starting and stopping GPS location services
								while using the app. The specific location
								coordinates received from your device's GPS
								services BikeMN will not be saved nor shared
								with any third parties by the app nor BikeMN for
								any reason.
							</Text>
						</View>
						<View style={styles.textBlock}>
							<Text>
								The specific location coordinates received from
								your device's GPS services BikeMN will not be
								saved nor shared with any third parties by the
								app nor BikeMN for any reason.
							</Text>
						</View>
						<View style={styles.textBlock}>
							<Text>
								I consent to the iBikeMN app using my device's
								GPS location services to capture location
								coordinates in order to calculate my travel
								distance while using the app.
							</Text>
						</View>
						<View style={styles.textBlock}>
							<Text>
								I understand that my GPS location coordinates
								are only being used to calculate travel distance
								data for use in BikeMN's grant reporting and to
								validate my participation in the incentive
								program for potential rewards.
							</Text>
						</View>
						<View style={styles.switchRight}>
							<Switch
							disabled={consents.location_tracking}
								trackColor={{
									false: "#cccccc",
									true: "#9cb59a",
								}}
								thumbColor={
									consents.location_tracking
										? "#23ab1a"
										: "#707070"
								}
								ios_backgroundColor="#3e3e3e"
								value={consents.location_tracking}
								onChange={(e) => {
									setConsents({
										...consents,
										location_tracking:
											!consents.location_tracking,
									});
								}}
								onValueChange={async (value) => {
									if (
										value &&
										!consents.location_tracking
									) {
										const foo =
											await InitialLocationPermissionRequest(
												dispatch
											);
										console.log("foo", foo);
									} else {
										Alert.alert(
											"Location Services Disabled",
											"Please enable location services for this app in your device settings.",
											[
												{
													text: "Open Settings",
													onPress: () => {
														if (
															Platform.OS ===
															"ios"
														) {
															Linking.openURL(
																"app-settings:"
															);
														} else {
															Linking.openSettings();
														}
													},
												},
												{
													text: "Cancel",
													style: "cancel",
												},
											]
										);
									}
									validateSave();
									// 	console.log('E', e);
									// 	console.log('choice', consents.location_tracking);
								}}
							/>
							<Text>
								{consents.location_tracking ? "Yes" : "No"}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<View style={styles.switchLine}>
						<Text>
							Would you like to participate in the iBikeMN app
							incentive rewards program? You will be able to earn
							points based on your commuting activity, and
							exchange them for gift cards to local bike stores.
							*requires GPS location services to be enabled
						</Text>

						<View style={styles.switchRight}>
							<Switch
								disabled={!preferences.location_tracking}
								trackColor={{
									false: "#cccccc",
									true: "#9cb59a",
								}}
								thumbColor={
									consents.incentive ? "#23ab1a" : "#707070"
								}
								ios_backgroundColor="#3e3e3e"
								value={
									preferences.location_tracking &&
									consents.incentive
								}
								onChange={() =>
									setConsents({
										...consents,

										incentive: !consents.incentive,
									})
								}
								onValueChange={() => validateSave()}
							/>
							<Text>
								{preferences.location_tracking &&
								consents.incentive
									? "Yes"
									: "No"}
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.section}>
					<View style={styles.switchLine}>
						<Text>I consent to biometrics</Text>

						<View style={styles.switchRight}>
							<Switch
								trackColor={{
									false: "#cccccc",
									true: "#9cb59a",
								}}
								thumbColor={
									consents.biometrics
										? "#23ab1a"
										: "#707070"
								}
								ios_backgroundColor="#3e3e3e"
								value={consents.biometrics}
								onChange={() =>
									setConsents({
										...consents,
										biometrics: !consents.biometrics,
									})
								}
								onValueChange={() => validateSave()}
							/>
							<Text>{consents.biometrics ? "Yes" : "No"}</Text>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<View style={styles.switchLine}>
						<Text>I consent to notifications</Text>

						<View style={styles.switchRight}>
							<Switch
								trackColor={{
									false: "#cccccc",
									true: "#9cb59a",
								}}
								thumbColor={
									consents.notifications
										? "#23ab1a"
										: "#707070"
								}
								ios_backgroundColor="#3e3e3e"
								value={consents.notifications}
								onChange={() =>
									setConsents({
										...consents,
										notifications:
											!consents.notifications,
									})
								}
								onValueChange={() => validateSave()}
							/>
							<Text>
								{consents.notifications ? "Yes" : "No"}
							</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.section}>
				<View style={styles.grid}>
					<Button
						title={"Back"}
						icon={{
							name: "arrow-left",
							color: "white",
						}}
						onPress={() => {
							navigation.jumpTo("Demographics");
						}}
						buttonStyle={styles.backBtn}
						titleStyle={{
							marginRight: 15,
						}}
					/>
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
						icon={{
							name: "arrow-right",
							color: "white",
						}}
						iconRight={true}
						disabled={
							!preferences.location_tracking &&
							!validateSave()
						}
						onPress={() => {
							navigation.jumpTo("Submit");
						}}
						buttonStyle={styles.nextBtn}
						titleStyle={{
							marginLeft: 15,
						}}
					/>
				</View>
			</View>
		</KeyboardAvoidingScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		// width: "100%",
		backgroundColor: "#fff",
	},
	input: {
		fontSize: 12,
		marginVertical: -2,
	},
	label: {
		fontSize: 13,
		marginBottom: -5,
	},
	switchLine: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff3d6",
		padding: 10,
	},
	switchRight: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "auto",
		paddingHorizontal: 10,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		// borderColor:'lime',
		// borderWidth:3
	},
	gridItem: {
		width: "50%",
		padding: 1,
	},
	flexOne: {
		flex: 1,
		backgroundColor: "#fff",
	},
	nextBtn: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: 100,
		borderRadius: 12,
		backgroundColor: "#1269A9",
	},
	backBtn: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: 100,
		borderRadius: 12,
		backgroundColor: "#1269A9",
	},
	ml10: {
		marginLeft: 10,
	},
	ml15: {
		marginLeft: 15,
	},
	mr15: {
		marginRight: 15,
	},
	mb15: {
		marginBottom: 15,
	},
	mt15: {
		marginTop: 15,
	},
	section: {
		paddingHorizontal: 5,
		marginTop: 5,
		marginBottom: 5,
	},
	sectionTitle: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	fieldTitle: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 15,
	},
	dropdownContainer: {
		position: "relative",
		width: "100%",
		height: "auto",
		marginBottom: 15,
	},
	customSwitch: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		height: 30,
		width: 60,
		borderRadius: 15,
		backgroundColor: "grey",
	},
	track: {
		// flex: 1,
		height: "100%",
		width: "100%",
		borderRadius: 16,
		backgroundColor: "pink",
	},
	thumb: {
		height: "100%",
		width: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	active: {
		backgroundColor: "green",
		marginLeft: 30,
	},
	inactive: {
		backgroundColor: "black",
	},
	switchText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 13,
	},
	textBlock: { marginBottom: 5, paddingHorizontal: 2 },
	// customSwitch: {
	// 	flex: 1,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	// switch: {
	// 	width: 60,
	// 	height: 30,
	// 	borderRadius: 15,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	// active: {
	// 	backgroundColor: "green",
	// },
	// inactive: {
	// 	backgroundColor: "gray",
	// },
	// switchText:{
	// 	color:'#fff',
	// 	fontWeight:'bold',
	// 	fontSize:13
	// }
});
