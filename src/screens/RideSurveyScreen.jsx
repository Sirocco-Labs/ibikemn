import {
	SafeAreaView,
	View,
	StyleSheet,
	Keyboard,
	TouchableOpacity,
} from "react-native";
import { Text, Button, Input, CheckBox } from "@rneui/themed";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCommuteSlice } from "../redux/slices/commuteSlice";
import { useNavigation, CommonActions } from "@react-navigation/native";

import { addRideSurvey } from "../redux/thunks/rideSurveyThunk";
import KeyboardAvoidingScrollView from "../components/KeyboardAvoidingScrollView/KeyboardAvoidingScrollView";
import { checkChallengeCompletion } from "../redux/thunks/incentiveThunk";
import ScaleButton from "../components/ScaleButton/ScaleButton";

export default function RideSurveyScreen() {
	const inputStyling = useRef(null);
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [focused, setFocused] = useState(false);

	const destinationData = [
		{
			title: "Errands (grocery store, post office, etc)",
			choice: false,
			// flavor: "(grocery store, post office, etc)",
		},
		{
			title: "A place for recreation (local park, landmark, or trail)",
			choice: false,
			// flavor: "(local park, landmark, or trail)",
		},
		{
			title: "A place for socializing (a restaurant, bar, library)",
			choice: false,
			// flavor: "(a restaurant, bar, library)",
		},
		{
			title: "I rode for fitness",
			choice: false,
			// flavor: ""
		},
		{
			title: "Other",
			choice: false,
			flavor: "",
		},
	];

	const routeData = [
		{
			title: "Bike trail",
			choice: false,
			// flavor: "",
		},
		{
			title: "On road infrastructure (a bike lane, cycle track)",
			choice: false,
			// flavor: "(a bike lane, cycle track)",
		},
		{
			title: "A mix of both",
			choice: false,
			// flavor: "",
		},
		{
			title: "My route didn't include any bike friendly pathways",
			choice: false,
			// flavor: "",
		},
	];
	const surveyData = {
		is_replace_transit: null,
		is_solo: null,
		destination: destinationData,
		route: routeData,
	};
	const user = useSelector((store) => store.user);
	const commute = useSelector((store) => store.commute);

	const [survey, setSurvey] = useState(surveyData);

	const navigateHome = () => {
		navigation.navigate("HomeScreen");
	};

	const handleSubmit = () => {
		let destination = survey.destination.find((obj) => obj.choice === true);
		let route = survey.route.find((value) => value.choice === true);
		let hackination = destination.title;

		if (destination.title === "Other") {
			hackination = destination.flavor;
		}
		const payload = {
			ride_id: commute.ride_id,
			user_id: user.user_id,
			is_replace_transit: survey.is_replace_transit,
			is_solo: survey.is_solo,
			destination_type: hackination,
			route_type: route.title,
		};

		const userInfo = {
			user_id: user.user_id,
			publicUser: user.is_public,
			users_table_id: user.id,
		};

		console.log("PAYLOAD", payload);
		dispatch(addRideSurvey(payload));
		// (FIND ME)
		dispatch(checkChallengeCompletion(userInfo));
		// dispatch(updateUserIncentiveProgress(userInfo))
		navigation.navigate("HomeScreen");
		dispatch(clearCommuteSlice());
	};

	const validateSurvey = () => {
		let destination = survey.destination.find((obj) => obj.choice === true);
		let route = survey.route.find((value) => value.choice === true);

		if (
			survey.is_replace_transit !== null &&
			survey.is_solo !== null &&
			destination &&
			route
		) {
			return false;
		}
		return true;
	};
	const canSubmit = validateSurvey();

	useEffect(() => {
		validateSurvey();
	}, [survey]);

	const skipSurvey = () => {
		dispatch(clearCommuteSlice());
		navigateHome();
	};

	return (
		<View style={styles.section}>
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => Keyboard.dismiss()}
			>
				<View>
					<View>
						<Text style={styles.smallFieldTitle}>
							Was this a trip you would normally take by car or
							transit?
						</Text>
						<View style={styles.gridCB}>
							<View style={styles.gridItemCB}>
								<CheckBox
									title={"Yes"}
									checked={survey.is_replace_transit}
									onPress={() => {
										setSurvey((last) => ({
											...last,
											is_replace_transit:
												last.is_replace_transit
													? null
													: true,
										}));
									}}
								/>
							</View>
							<View style={styles.gridItemCB}>
								<CheckBox
									title={"No"}
									checked={
										survey.is_replace_transit === false
									}
									onPress={() => {
										setSurvey((last) => ({
											...last,
											is_replace_transit:
												last.is_replace_transit !==
												false
													? false
													: null,
										}));
									}}
								/>
							</View>
						</View>
					</View>

					<View>
						<Text style={styles.smallFieldTitle}>
							Who did you travel with?
						</Text>
						<View style={styles.gridCB}>
							<View style={styles.gridItemCB}>
								<CheckBox
									title={"By myself"}
									checked={survey.is_solo}
									onPress={() => {
										setSurvey((last) => ({
											...last,
											is_solo: last.is_solo ? null : true,
										}));
									}}
								/>
							</View>
							<View style={styles.gridItemCB}>
								<CheckBox
									title={"In a group"}
									checked={survey.is_solo === false}
									onPress={() => {
										setSurvey((last) => ({
											...last,
											is_solo:
												last.is_solo !== false
													? false
													: null,
										}));
									}}
								/>
							</View>
						</View>
					</View>
				</View>
				<View>
					<Text style={styles.fieldTitle}>Where did you go?</Text>
					<View style={styles.gridCB}>
						{destinationData.map(
							(box, i) =>
								box.title !== "Other" && (
									<View style={styles.lastGridItemCB} key={i}>
										<CheckBox
											iconRight={false}
											title={box.title}
											checked={
												survey.destination[i].choice
											}
											onPress={() => {
												setSurvey({
													...survey,
													destination:
														survey.destination.map(
															(object, index) =>
																index === i && {
																	...object,
																	choice: !object.choice,
																}
														),
												});
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
											}}
										/>
									</View>
								)
						)}
						<Input
							ref={inputRef}
							placeholder={"Other"}
							value={survey.destination[4].flavor}
							inputStyle={styles.input}
							labelStyle={styles.label}
							onChangeText={(text) =>
								setSurvey({
									...survey,
									destination: survey.destination.map(
										(object) =>
											object.title === "Other" && {
												...object,
												flavor: text,
											}
									),
								})
							}
							onEndEditing={() => {
								setSurvey({
									...survey,
									destination: survey.destination.map(
										(object) =>
											object.title === "Other" && {
												...object,
												choice: !object.choice,
											}
									),
								});
							}}
						/>
					</View>
				</View>

				<View>
					<Text style={styles.fieldTitle}>
						What kind of route did you take?
					</Text>
					<View style={styles.gridCB}>
						{routeData.map((box, i) => (
							<View style={styles.lastGridItemCB} key={i}>
								<CheckBox
									iconRight={false}
									title={box.title}
									checked={survey.route[i].choice}
									onPress={() => {
										setSurvey({
											...survey,
											route: survey.route.map(
												(object, index) =>
													index === i && {
														...object,
														choice: !object.choice,
													}
											),
										});
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
									}}
								/>
							</View>
						))}
					</View>
				</View>
			</TouchableOpacity>

			<View>
				<ScaleButton
					looks={[styles.solidButton, { width: 300 }]}
					offLooks={[styles.solidButtonOff, { width: 300 }]}
					disabled={validateSurvey()}
					onPress={handleSubmit}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "700",
							color: "#fff",
						}}
					>
						Submit
					</Text>
				</ScaleButton>
				{/* <Button
					raised
					disabled={validateSurvey()}
					onPress={handleSubmit}
				>
					Submit
				</Button> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	section: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
	},
	sectionCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		height: "100%",
	},
	popUp: {
		height: "90%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
		// borderColor:'green',
		// borderWidth:10
	},

	sectionView: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 5,
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	btnGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: "100%",
	},
	btnGridItem: {
		width: "30%",
		padding: 1,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	gridItem: {
		width: "50%",
		padding: 1,
	},
	lastGridItem: {
		width: "100%",
		padding: 1,
	},
	mainView: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		padding: "15px",
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
	gridCB: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		// alignItems: "flex-start",
		width: "100%",
		// borderColor:'lime',
		// borderWidth:1
	},
	gridItemCB: {
		width: "50%",
		padding: 0.5,
		marginVertical: 1,
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
	fieldTitle: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 15,
	},
	smallFieldTitle: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 5,
	},
	input: {
		fontSize: 12,
		marginVertical: -2,
	},
	label: {
		fontSize: 13,
		marginBottom: -5,
	},
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
	},
	solidButtonOff: {
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 55,
		padding: 2,
	},
	outlineButton: {
		borderWidth: 2,
		borderColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
	},
	outlineButtonOff: {
		borderWidth: 1.5,
		borderColor: "#C0C0C0",
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
});
