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

import MCIcons from "../MCIcons/MCIcons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/thunks/userThunk";
import { setIntakeHomeAddress } from "../../redux/slices/intakeFormSlice";
import { setIntakeWorkAddress } from "../../redux/slices/intakeFormSlice";

import KeyboardAvoidingScrollView from "../KeyboardAvoidingScrollView/KeyboardAvoidingScrollView";
import ScreenWrapper from "../ScreenWrapper/ScreenWrapper";
export default function IntakeFormAddress({ navigation, route }) {
	const inputData = {
		city: "",
		state: "",
		zip: "",
	};
	const [homeAddress, setHomeAddress] = useState(inputData);
	const [workAddress, setWorkAddress] = useState(inputData);

	const dispatch = useDispatch();
	const { index, routeNames } = navigation.getState();
	const tabFocused = route.name === routeNames[index] ? true : false;

	const [loading, setLoading] = useState(false);
	const intake = useSelector((store) => store.intake);

	useEffect(() => {
		setHomeAddress(intake.homeAddress);
		setWorkAddress(intake.workAddress);
		if (
			tabFocused &&
			loading &&
			intake.homeAddress.zip &&
			intake.workAddress.zip
		) {
			Alert.alert("Success", "Your address information has been saved.");
			setLoading(false);
		}
	}, [intake]);

	const handleSave = () => {
		dispatch(setIntakeHomeAddress(homeAddress));
		dispatch(setIntakeWorkAddress(workAddress));
		setLoading(!loading);
	};
	const validateSave = () => {
		if (
			homeAddress.city &&
			homeAddress.state &&
			homeAddress.zip &&
			workAddress.city &&
			workAddress.state &&
			workAddress.zip
		) {
			return false;
		}
		return true;
	};

	return (
		// <KeyboardAvoidingScrollView>
		<ScreenWrapper
			background={{ backgroundColor: "#fff" }}
			// noScroll={true}
		>
			{/* <View style={styles.flexOne}> */}
			<View style={styles.screenFormat}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : null}
					// style={{
					// 	flexGrow: 2,
					// 	justifyContent: "center",
					// 	alignItems: "center",
					// 	width: "100%",
					// }}
				>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Home Address</Text>
						<View>
							<Input
								label="City"
								placeholder="What city do you live in?"
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={homeAddress.city}
								onChangeText={(text) =>
									setHomeAddress({
										...homeAddress,
										city: text,
									})
								}
							/>
						</View>
						<View style={styles.grid}>
							{/* state */}
							<View style={styles.gridItem}>
								<Input
									label="State"
									placeholder=" State"
									inputStyle={styles.input}
									labelStyle={styles.label}
									value={homeAddress.state}
									onChangeText={(text) =>
										setHomeAddress({
											...homeAddress,
											state: text,
										})
									}
								/>
							</View>
							{/* zip */}
							<View style={styles.gridItem}>
								<Input
									keyboardType="numeric"
									label="Zip Code"
									placeholder="Zip Code"
									inputStyle={styles.input}
									labelStyle={styles.label}
									value={homeAddress.zip}
									onChangeText={(text) =>
										setHomeAddress({
											...homeAddress,
											zip: text,
										})
									}
								/>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : null}
					// style={{
					// 	flexGrow: 2,
					// 	justifyContent: "center",
					// 	alignItems: "center",
					// 	width: "100%",
					// }}
				>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Work Address</Text>

						<View>
							<Input
								label="City"
								placeholder="What city do you work in?"
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={workAddress.city}
								onChangeText={(text) =>
									setWorkAddress({
										...workAddress,
										city: text,
									})
								}
							/>
						</View>
						<View style={styles.grid}>
							{/* state */}
							<View style={styles.gridItem}>
								<Input
									label="State"
									placeholder="State"
									inputStyle={styles.input}
									labelStyle={styles.label}
									value={workAddress.state}
									onChangeText={(text) =>
										setWorkAddress({
											...workAddress,
											state: text,
										})
									}
								/>
							</View>
							{/* zip */}
							<View style={styles.gridItem}>
								<Input
									keyboardType="numeric"
									label="Zip Code"
									placeholder="Zip Code"
									inputStyle={styles.input}
									labelStyle={styles.label}
									value={workAddress.zip}
									onChangeText={(text) =>
										setWorkAddress({
											...workAddress,
											zip: text,
										})
									}
								/>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>

			<View style={styles.btnSection}>
				<View style={styles.grid}>
					<Button
						title={"Back"}
						icon={{
							name: "arrow-left",
							color: "white",
						}}
						onPress={() => {
							navigation.jumpTo("User");
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
							!intake.homeAddress.zip && !intake.workAddress.zip
							// validateSave()
						}
						onPress={() => {
							navigation.jumpTo("Screening");
						}}
						buttonStyle={styles.nextBtn}
						titleStyle={{
							marginLeft: 15,
						}}
					/>
				</View>
			</View>
			{/* </View> */}
		</ScreenWrapper>
		// {/* </KeyboardAvoidingScrollView> */}
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		// width: "100%",
		backgroundColor: "#fff",
	},
	// input: {
	// 	fontSize: 12,
	// 	marginVertical: -2,
	// },
	// label: {
	// 	fontSize: 13,
	// 	marginBottom: -5,
	// },
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
	ml15: {
		marginLeft: 15,
	},
	mr15: {
		marginRight: 15,
	},
	screenFormat: {
		flex: 1,
		alignItems: "center",

	},
	btnSection: {
		paddingHorizontal: 0,
		marginTop: 5,
		marginBottom: 5,
		width: "100%",

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
});
