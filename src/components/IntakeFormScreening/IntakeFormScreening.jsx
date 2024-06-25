import {
	ScrollView,
	StyleSheet,
	View,
	Alert,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Input, Button, Text, Slider, Icon, CheckBox } from "@rneui/themed";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setIntakeScreening } from "../../redux/slices/intakeFormSlice";
import KeyboardAvoidingScrollView from "../KeyboardAvoidingScrollView/KeyboardAvoidingScrollView";
import { confirmSecret } from "../../redux/thunks/authThunk";
import ScreenWrapper from "../ScreenWrapper/ScreenWrapper";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { clearFeedback, setFeedback } from "../../redux/slices/feedbackSlice";

import { setIntakeSecret, setOrg } from "../../redux/slices/intakeFormSlice";
export default function IntakeFormScreening({ navigation, route }) {
	const dispatch = useDispatch();

	const { index, routeNames } = navigation.getState();
	const tabFocused = route.name === routeNames[index] ? true : false;

	const inputData = {
		how_did_you_hear: 0,
		commute_frequency: 0,
		bike_confidence: 0,
		staff_identity: null,
		org_identity: 0,
		admin_identity: null,
	};

	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState("");
	const [value, setValue] = useState(null);

	const intake = useSelector((store) => store.intake);
	const feedback = useSelector((store) => store.feedback);
	const [screening, setScreening] = useState(intake.screening);

	// const discovery = [
	// 	{
	// 		key: "1",
	// 		value: "Prefer not to answer",
	// 	},
	// 	{
	// 		key: "2",
	// 		value: "BikeMN Marketing",
	// 	},
	// 	{
	// 		key: "3",
	// 		value: "Facebook",
	// 	},
	// 	{
	// 		key: "4",
	// 		value: "Instagram",
	// 	},
	// 	{
	// 		key: "5",
	// 		value: "Community Connection",
	// 	},
	// 	{
	// 		key: "6",
	// 		value: "I found it on my own",
	// 	},
	// ];
	const discoveryData = [
		{
			choice: false,
			title: "Prefer not to answer",
			value: 1,
		},
		{
			choice: false,
			title: "BikeMN Marketing",
			value: 2,
		},
		{
			choice: false,
			title: "Facebook",
			value: 3,
		},
		{
			choice: false,
			title: "Instagram",
			value: 4,
		},
		{
			choice: false,
			title: "Community Connection",
			value: 5,
		},
		{
			choice: false,
			title: "I found it on my own",
			value: 6,
		},
	];
	const frequencyData = [
		{
			choice: false,
			title: "Prefer not to answer",
			value: 1,
		},
		{
			choice: false,
			title: "I've never biked to work",
			value: 2,
		},
		{
			choice: false,
			title: "At least one time",
			value: 3,
		},
		{
			choice: false,
			title: "One day per month",
			value: 4,
		},
		{
			choice: false,
			title: "More than one day per month",
			value: 5,
		},
		{
			choice: false,
			title: "At least one day per week",
			value: 6,
		},
		{
			choice: false,
			title: "Every day that I possibly can",
			value: 7,
		},
	];

	const employmentData = [
		{
			level: "admin",
			choice: false,
			title: "BikeMN",
			value: 0,
		},
		{
			level: "staff",
			choice: false,
			title: "Venture Bikes",
			value: 1,
		},
		{
			level: "staff",
			choice: false,
			title: "Move MPLS",
			value: 2,
		},
		{
			level: "staff",
			choice: false,
			title: "International Institute",
			value: 3,
		},
		{
			level: "staff",
			choice: false,
			title: "Infra",
			value: 4,
		},
	];

	const orgData = [
		{
			choice: false,
			title: "ERIK's Bike Board Ski (Lyndale)",
		},
		{
			choice: false,
			title: "Venture Bikes",
		},
		{
			choice: false,
			title: "Full Cycle",
		},
		{
			choice: false,
			title: "Freewheel Bike",
		},
	];
	const [discovery, setDiscovery] = useState(discoveryData);
	const [frequency, setFrequency] = useState(frequencyData);
	const [employment, setEmployment] = useState(employmentData);
	const [advance, setAdvance] = useState(false);

	const showVerifyError = (message) => {
		Toast.show({
			type: "error",
			text1: `${message}`,
			text2: "Please try again",
			text2Style: { fontSize: 11, color: "#000" },
			onHide: () => {
				dispatch(
					clearFeedback({ sliceName: "registration", type: "error" })
				);
				setSecret('')
			},
		});
	};
	const showVerifySuccess = (message) => {
		Toast.show({
			type: "success",
			text1: `${message}`,
			onHide: () => {
				dispatch(
					clearFeedback({
						sliceName: "registration",
						type: "success",
					})
				);
				setSecret("");
			},
		});
	};

	useFocusEffect(
		useCallback(() => {
			console.log("$# UCB SCREENING", screening);
			console.log("$# UCB INTAKE", intake.screening);
			setValue(
				intake.screening.bike_confidence === 0
					? 1
					: intake.screening.bike_confidence
			);
			validateSave();
			return () => {
				console.log("$# UCB RETURN");
				setScreening(intake.screening);
				setValue(
					intake.screening.bike_confidence !== 0
						? intake.screening.bike_confidence
						: 1
				);
				setAdvance(false)
			};
		}, [intake])
	);

	useEffect(() => {
		console.log("## FEEDBACK CHANGED");
		if (feedback.registration.error.value) {
			showVerifyError(feedback.registration.error.message);
		}
		if (feedback.registration.success.value) {
			showVerifySuccess(feedback.registration.success.message);
		}
	}, [feedback.registration]);

	useEffect(() => {
		console.log("$# UE SCREENING", screening);
		console.log("$# UE ADVANCE", advance);
		console.log("$# UE1 INTAKE", intake.screening);
		validateSave();
	}, [screening]);

	useEffect(() => {
		console.log("$# UE2 INTAKE", intake.screening);

		setScreening(intake.screening);
		// setValue(
		// 	intake.screening.bike_confidence !== 0
		// 		? intake.screening.bike_confidence
		// 		: 1
		// );
		if (
			tabFocused &&
			loading &&
			intake.screening.how_did_you_hear &&
			intake.screening.commute_frequency &&
			intake.screening.bike_confidence
		) {
			Alert.alert("Success", "Your answers have been saved.");
			setLoading(false);
		}
	}, [intake]);



	useEffect(() => {
		console.log("$# VALUE CHANGED");
		setScreening({ ...screening, bike_confidence: value });
		validateSave();
	}, [value]);

	// useEffect(() => {
	// 	// console.log(screening);
	// 	if (screening.staff_identity === false) {
	// 		setScreening({ ...screening, org_identity: 0 });
	// 	}
	// 	validateSave();
	// }, [screening.staff_identity]);

	// useEffect(() => {
	// 	// console.log(screening);
	// 	if (screening.admin_identity === true) {
	// 		setScreening({ ...screening, staff_identity: null });
	// 		setScreening({ ...screening, org_identity: 0 });
	// 	}
	// 	validateSave();
	// }, [screening.admin_identity]);

	// useEffect(() => {
	// 	// console.log(screening);
	// 	validateSave();
	// }, [screening.org_identity]);

	const handleSave = () => {
		dispatch(setIntakeScreening(screening));

		setLoading(!loading);
	};
	const interpolate = (start, end) => {
		let k = (screening.bike_confidence - 0) / 10; // 0 =>min  && 10 => MAX
		return Math.ceil((1 - k) * start + k * end) % 256;
	};
	const color = () => {
		let r = interpolate(255, 100);
		let g = interpolate(50, 200);
		let b = interpolate(80, 100);
		return `rgb(${r},${g},${b})`;
	};

	const validateSave = () => {
		if (
			screening.how_did_you_hear &&
			screening.commute_frequency &&
			screening.bike_confidence >= 1
		) {
			if (
				screening.admin_identity === true &&
				screening.org_identity === 0
			) {
				return false;
			} else if (
				screening.admin_identity === null &&
				screening.staff_identity === null &&
				advance === false
			) {
				return false;
			} else if (
				screening.admin_identity === false &&
				screening.staff_identity === true &&
				screening.org_identity !== 0
			) {
				return false;
			} else {
				return true;
			}
		}
		return true;
	};

	const updatePayload = (target, updateValue) => {
		if (target === "admin_identity") {
			console.log(
				"$# UPDATE PAYLOAD ADMIN: screening, target, value",
				screening,
				target,
				updateValue
			);
			if (screening.org_identity === 0) {
				setScreening({
					...screening,
					org_identity: "N/A",
					admin_identity: false,
					staff_identity: false,
					bike_confidence: value,
				});
			} else {
				setScreening({
					...screening,
					admin_identity: updateValue,
					staff_identity: !updateValue,
					org_identity: 0,
					bike_confidence: value,
				});
			}
		} else if (target === "org_identity") {
			console.log(
				"$# UPDATE PAYLOAD ORG: screening, target, updateValue",
				screening,
				target,
				updateValue
			);
			if (screening[`${target}`] === updateValue) {
				setScreening({
					...screening,
					[`${target}`]: "N/A",
					admin_identity: false,
					staff_identity: false,
					bike_confidence: value,
				});
			} else {
				setScreening({
					...screening,
					admin_identity: false,
					staff_identity: true,
					org_identity: updateValue,
					bike_confidence: value,
				});
			}
		} else {
			console.log(
				"$# UPDATE PAYLOAD: screening, target, updateValue",
				screening,
				target,
				updateValue
			);
			if (screening[`${target}`] === updateValue) {
				setScreening({
					...screening,
					[`${target}`]: 0,
					bike_confidence: value,
				});
			} else {
				setScreening({
					...screening,
					[`${target}`]: updateValue,
					bike_confidence: value,
				});
			}
		}
	};

	const handleSingleCheck = (key) => {
		setChecked((last) =>
			// loop through previous state
			last.map(
				(object, index) =>
					// if the index of the previous state is the same as the index passed in
					// then return that object with the change in choice value
					index === key && { ...object, choice: !object.choice }
			)
		);
	};
	const handleMultiCheck = (key) => {
		setChecked((last) =>
			// loop through previous state
			last.map((object, index) =>
				// if the index of the previous state is the same as the one passed in
				// then return the spread of the object there to change its choice property's boolean value,
				// otherwise return the other objects unchanged
				index === key ? { ...object, choice: !object.choice } : object
			)
		);
	};
	const checkForLast = (array, index) => {
		return array.length % 2 && index === array.length - 1;
	};

	const [secret, setSecret] = useState("");

	const checkSecret = () => {
		dispatch(confirmSecret(secret));

		// handleSave();
	};

	const handleNext = () => {
		console.log('ADVANCE', advance);
		if (
			!intake.screening.how_did_you_hear &&
			!intake.screening.commute_frequency &&
			!intake.screening.bike_confidence
		) {
			return true;
		} else if (advance === true && intake.screening.secret) {
				if (
					intake.screening.how_did_you_hear &&
					intake.screening.commute_frequency &&
					intake.screening.bike_confidence
				) {
					return false;
				} else {
					return true;
				}
			}

	};

	return (
		// <KeyboardAvoidingScrollView>
		<ScreenWrapper background={{ backgroundColor: "#fff" }}>
			<View style={styles.flexOne}>
				{/* <Button
				onPress={()=>{dispatch(setOrg())}}
				>
					clear

				</Button> */}
				<View style={styles.section}>
					<View>
						<View>
							<Text
								style={[styles.fieldTitle, { marginLeft: 5 }]}
							>
								How did you hear about this app?
							</Text>
						</View>
						<View style={styles.gridCB}>
							{discoveryData.map((box, i) => (
								<View
									style={
										checkForLast(discoveryData, i)
											? styles.lastGridItemCB
											: styles.gridItemCB
									}
									key={i}
								>
									<CheckBox
										iconRight={false}
										title={box.title}
										checked={
											screening.how_did_you_hear ===
											box.value
										}
										// checked={
										// 	screening.how_did_you_hear ===
										// 		box.value || discovery[i].choice
										// }
										// checked={discovery[i].choice}
										onPress={() => {
											// loop through previous state
											// if the index of the previous state is the same as the index passed in
											// then return that object with the change in choice value
											setDiscovery((last) =>
												last.map(
													(object, index) =>
														index === i && {
															...object,
															choice: !object.choice,
														}
												)
											);
											updatePayload(
												"how_did_you_hear",
												box.value
											);
											validateSave();
										}}
										textStyle={{
											fontSize: 12,
											fontWeight: "bold",
										}}
										containerStyle={{
											height: "auto",
											paddingVertical: 0,
											paddingLeft: 0,
											margin: 0,
											// borderColor: "magenta",
											// borderWidth: 1,
										}}
									/>
								</View>
							))}
						</View>
					</View>

					<View>
						<Text style={[styles.fieldTitle, { marginLeft: 5 }]}>
							How often do you ride your bike to work?
						</Text>
						<View style={styles.gridCB}>
							{frequencyData.map((box, i) => (
								<View
									style={
										checkForLast(frequencyData, i)
											? styles.lastGridItemCB
											: styles.gridItemCB
									}
									key={i}
								>
									<CheckBox
										iconRight={false}
										title={box.title}
										checked={
											screening.commute_frequency ===
											box.value
										}
										onPress={() => {
											// loop through previous state
											// if the index of the previous state is the same as the index passed in
											// then return that object with the change in choice value
											setFrequency((last) =>
												last.map(
													(object, index) =>
														index === i && {
															...object,
															choice: !object.choice,
														}
												)
											);
											updatePayload(
												"commute_frequency",
												box.value
											);

											validateSave();
										}}
										textStyle={{
											fontSize: 12,
											fontWeight: "bold",
										}}
										containerStyle={{
											height: "auto",
											paddingVertical: 0,
											paddingLeft: 0,
											margin: 0,
											// borderColor: "magenta",
											// borderWidth: 1,
										}}
									/>
								</View>
							))}
						</View>
					</View>

					<View style={styles.section}>
						<Text style={[styles.fieldTitle, { marginLeft: 5 }]}>
							On a scale from 1 to 10, how would you rate your
							knowledge of bikes?
						</Text>
						<Slider
							value={value}
							onValueChange={setValue}
							maximumValue={10}
							minimumValue={1}
							step={1}
							allowTouchTrack
							trackStyle={{
								height: 5,
								backgroundColor: "transparent",
							}}
							thumbStyle={{
								height: 35,
								width: 35,
								backgroundColor: color(),
							}}
							thumbProps={{
								children: (
									<View
										style={{
											width: 35,
											flex: 1,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "bold",
												color: "#fff",
											}}
										>
											{value}
										</Text>
									</View>
								),
							}}
						/>
					</View>

					<View style={styles.section}>
						<View>
							<CheckBox
								iconRight={false}
								title={
									"I am employed by BikeMN or one of its partner organizations"
								}
								checked={
									intake.screening.staff_identity ||
									intake.screening.staff_identity ||
									advance
								}
								onPress={() => {
									setAdvance(!advance);
									// dispatch(setIntakeSecret(false))
									validateSave();
								}}
								textStyle={{
									fontSize: 12,
									fontWeight: "bold",
								}}
								containerStyle={{
									height: "auto",
									paddingVertical: 0,
									paddingLeft: 0,
									marginBottom:
										intake.screening.staff_identity ||
										intake.screening.staff_identity ||
										advance
											? 0
											: 80,
									// borderColor: "magenta",
									// borderWidth: 1,
								}}
							/>
						</View>
						{(intake.screening.staff_identity ||
							intake.screening.staff_identity ||
							advance) && (
							<View
								style={[
									styles.verifySection,
									{ marginBottom: intake.secret ? 30 : 50 },
								]}
							>
								{!intake.secret ? (
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "flex-start",
											// width: "100%",
										}}
									>
										<KeyboardAvoidingView
											behavior={
												Platform.OS === "ios"
													? "padding"
													: null
											}
											style={{
												flexGrow: 1,
												justifyContent: "space-around",
												alignItems: "center",

												// width: "100%",
											}}
										>
											<Input
												value={secret}
												placeholder={
													"Verification code"
												}
												onChangeText={(text) => {
													setSecret(text);
												}}
											/>
										</KeyboardAvoidingView>
										<Button
											buttonStyle={styles.backBtn}
											onPress={checkSecret}
										>
											Verify
										</Button>
									</View>
								) : (
									<>
										<Text
											style={[
												styles.fieldTitle,
												{ marginLeft: 5 },
											]}
										>
											Who's your employer?
										</Text>
										<View style={styles.gridCB}>
											{employmentData.map((box, i) => (
												<View
													style={
														checkForLast(
															employmentData,
															i
														)
															? styles.lastGridItemCB
															: styles.gridItemCB
													}
													key={i}
												>
													<CheckBox
														iconRight={false}
														title={box.title}
														checked={
															screening.org_identity !==
																"N/A" &&
															screening.org_identity ===
																box.value
														}
														onPress={() => {
															// loop through previous state
															// if the index of the previous state is the same as the index passed in
															// then return that object with the change in choice value
															setEmployment(
																(last) =>
																	last.map(
																		(
																			object,
																			index
																		) =>
																			index ===
																				i && {
																				...object,
																				choice: !object.choice,
																			}
																	)
															);
															if (
																box.level ===
																"admin"
															) {
																updatePayload(
																	"admin_identity",
																	true
																);
															} else {
																updatePayload(
																	"org_identity",
																	box.value
																);
															}
															validateSave();
														}}
														textStyle={{
															fontSize: 12,
															fontWeight: "bold",
														}}
														containerStyle={{
															height: "auto",
															paddingVertical: 0,
															paddingLeft: 0,
															margin: 0,
															// borderColor: "magenta",
															// borderWidth: 1,
														}}
													/>
												</View>
											))}
										</View>
									</>
								)}
							</View>
						)}
					</View>

				</View>
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
									navigation.jumpTo("Address");
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
								disabled={handleNext()}
								onPress={() => {
									navigation.jumpTo("Demographics");
								}}
								buttonStyle={styles.nextBtn}
								titleStyle={{
									marginLeft: 15,
								}}
							/>
						</View>
					</View>
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
	input: {
		fontSize: 12,
		marginVertical: -2,
	},
	label: {
		fontSize: 13,
		marginBottom: -5,
	},
	gridCB: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		// alignItems: "flex-start",
		width: "100%",
		// borderColor:'lime',
		// borderWidth:3
	},
	gridItemCB: {
		width: "50%",
		padding: 1,
		marginVertical: 0,
		// borderColor: "lime",
		// borderWidth: 1,
	},
	lastGridItemCB: {
		width: "100%",
		padding: 1,
		marginVertical: 0,
		// borderColor: "lime",
		// borderWidth: 1,
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
	mb15: {
		marginBottom: 15,
	},
	mt15: {
		marginTop: 15,
	},
	btnSection: {
		width:'100%',
		marginBottom: 5,
	},
	section: {
		// paddingHorizontal: 5,
		marginTop: 5,
		marginBottom: 5,
	},
	verifySection: {
		paddingHorizontal: 0,
		marginTop: -2,
	},
	sectionTitle: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	fieldTitle: {
		fontSize: 15,
		fontWeight: "bold",
		marginVertical: 5,
	},
	dropdownContainer: {
		position: "relative",
		width: "100%",
		height: "auto",
		marginBottom: 15,
	},
});
