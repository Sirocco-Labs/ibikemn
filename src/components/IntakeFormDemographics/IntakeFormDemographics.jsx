import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { Input, Button, Text, CheckBox } from "@rneui/themed";
import {
	SelectList,
	MultipleSelectList,
} from "react-native-dropdown-select-list";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIntakeDemographics } from "../../redux/slices/intakeFormSlice";
import KeyboardAvoidingScrollView from "../KeyboardAvoidingScrollView/KeyboardAvoidingScrollView";
import { useFocusEffect } from "@react-navigation/native";

export default function IntakeFormDemographics({ navigation, route }) {
	const dispatch = useDispatch();
	const inputData = {
		age: "",
		gender_identity: "",
		race: [],
		income_level: "",
		zip_code: "",
	};

	const raceData = [
		{ choice: false, title: "Prefer not to answer", value: 1 },
		{ choice: false, title: "American Indian or Alaska Native", value: 2 },
		{ choice: false, title: "Asian or Asian American", value: 3 },
		{ choice: false, title: "Black or African American", value: 4 },
		{ choice: false, title: "Hispanic or Latino/a", value: 5 },
		{ choice: false, title: "Middle Eastern or North African ", value: 6 },
		{
			choice: false,
			title: "Native Hawai`ian or Pacific Islander",
			value: 7,
		},
		{ choice: false, title: "White or European", value: 8 },
		{ choice: false, title: "My identities are not included", value: 9 },
	];
	const incomeData = [
		{ choice: false, title: "Prefer not to answer", value: 1 },
		{ choice: false, title: "$0-$9,999", value: 2 },
		{ choice: false, title: "$10,000-$24,999", value: 3 },
		{ choice: false, title: "$25,000-$49,999", value: 4 },
		{ choice: false, title: "$50,000-$74,999", value: 5 },
		{ choice: false, title: "$75,000-$99,999", value: 6 },
		{ choice: false, title: "$100,000-$149,999", value: 7 },
		{ choice: false, title: "More than $150,000", value: 8 },
	];

	const [selected, setSelected] = useState("");

	const [race, setRace] = useState(raceData);
	const [income, setIncome] = useState(incomeData);

	const intake = useSelector((store) => store.intake);
	const [demographics, setDemographics] = useState(intake.demographics);

	const { index, routeNames } = navigation.getState();
	const tabFocused = route.name === routeNames[index] ? true : false;

	const [loading, setLoading] = useState(false);
	const [stopper, setStopper] = useState(demographics.race.includes('Prefer not to answer') || demographics.race.includes('My identities are not included') ? true :false);

	useFocusEffect(
		useCallback(() => {
			console.log("$# UCB DEMO", intake.demographics);
			// setDemographics(intake.demographics);
			validateSave();
			return () => {
				setDemographics(intake.demographics);
				setStopper(
					demographics.race.includes("Prefer not to answer") ||
						demographics.race.includes(
							"My identities are not included"
						)
						? true
						: false
				);
			};
		}, [intake])
	);

	useEffect(() => {
		validateSave();

		console.log("$# race", demographics.race);
		console.log("$# income", demographics.income_level);
	}, [demographics]);

	useEffect(() => {
		setDemographics(intake.demographics);
		setStopper(
			demographics.race.includes("Prefer not to answer") ||
				demographics.race.includes("My identities are not included")
				? true
				: false
		);
		if (
			tabFocused &&
			loading &&
			intake.demographics.age &&
			intake.demographics.gender_identity
		) {
			Alert.alert("Success", "Your information has been saved.");
			setLoading(false);
		}
	}, [intake]);

	const validateSave = () => {
		if (
			demographics.age &&
			demographics.gender_identity &&
			demographics.race.length > 0 &&
			demographics.income_level
		) {
			return false;
		}
		return true;
	};
	const handleSave = () => {
		dispatch(setIntakeDemographics(demographics));

		setLoading(!loading);
	};

	const updatePayload = (target, value) => {
		let holder = [...demographics.race];
		if (target === "race") {
			if (
				value === "My identities are not included" ||
				value === "Prefer not to answer"
			) {
				if (demographics.race.includes(value)) {
					setStopper(false);
					holder = [];
				} else {
					setStopper(true);
					holder = [value];
				}
				setDemographics({ ...demographics, race: holder });
			} else {
				if (!demographics.race.includes(value)) {
					holder.push(value);
				} else {
					console.log("Value was in holder", holder);
					holder = holder.filter((key) => key !== value);
					console.log("filter holder", holder);
				}
				setDemographics({ ...demographics, race: holder });
			}
		} else {
			if (demographics[`${target}`] === value) {
				setDemographics({
					...demographics,
					[`${target}`]: "",
				});
			} else {
				setDemographics({ ...demographics, [`${target}`]: value });
			}
		}
	};

	const checkForLast = (array, index) => {
		return array.length % 2 && index === array.length - 1;
	};

	const shouldBeCheckedRace = (data, demo) => {
		let checked = demo.race.includes(data.title);
		console.log("$@ CHECKED", checked);

		return checked;
	};
	const shouldBeCheckedIncome = (data, demo) => {
		let checked = demo.income.includes(data.title);
		console.log("$@ CHECKED", checked);

		return checked;
	};

	return (
		<KeyboardAvoidingScrollView>
			<View style={styles.flexOne}>
				<View style={styles.section}>
					<View>
						<Input
							keyboardType="numeric"
							label="Age"
							placeholder=""
							inputStyle={styles.input}
							labelStyle={styles.label}
							value={`${demographics.age}`}
							onChangeText={(text) => {
								setDemographics({
									...demographics,
									age: text,
								});
								validateSave();
							}}
						/>
					</View>
					<View>
						<Input
							label="What is your current gender identity?"
							placeholder=""
							inputStyle={styles.input}
							labelStyle={styles.label}
							value={demographics.gender_identity}
							onChangeText={(text) => {
								setDemographics({
									...demographics,
									gender_identity: text,
								});
								validateSave();
							}}
						/>
					</View>
				</View>
				<View style={styles.section}>
					<View>
						<Text style={[styles.fieldTitle, { marginLeft: 5 }]}>
							What are your racial/ethnic identities?
						</Text>
						<Text style={[{ marginLeft: 8, marginBottom: 10 }]}>
							(choose all that apply)
						</Text>
					</View>
					<View style={styles.gridCB}>
						{raceData.map((box, i) => (
							<View
								style={
									checkForLast(raceData, i)
										? styles.lastGridItemCB
										: styles.gridItemCB
								}
								key={i}
							>
								<CheckBox
									iconRight={false}
									title={box.title}
									disabled={
										!demographics.race.includes(
											box.title
										) && stopper
									}
									// checked={race[i].choice shouldBeChecked(race[1], demographics)}
									checked={demographics.race.includes(
										box.title
									)}
									onPress={() => {
										// loop through previous state
										// if the index of the previous state is the same as the index passed in
										// then return that object with the change in choice value
										setRace((last) =>
											last.map((object, index) =>
												index === i
													? {
															...object,
															choice: !object.choice,
													  }
													: object
											)
										);

										updatePayload("race", box.title);

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
					<View>
						<Text style={[styles.fieldTitle, { marginLeft: 5 }]}>
							Which of the following best describes your personal
							income last year?
						</Text>
					</View>
					<View style={styles.gridCB}>
						{incomeData.map((box, i) => (
							<View
								style={
									checkForLast(incomeData, i)
										? styles.lastGridItemCB
										: styles.gridItemCB
								}
								key={i}
							>
								<CheckBox
									iconRight={false}
									title={box.title}
									checked={
										demographics.income_level === box.value
									}
									// checked={income[i].choice}
									onPress={() => {
										// loop through previous state
										// if the index of the previous state is the same as the index passed in
										// then return that object with the change in choice value
										setIncome((last) =>
											last.map(
												(object, index) =>
													index === i && {
														...object,
														choice: !object.choice,
													}
											)
										);

										updatePayload(
											"income_level",
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
					<View style={styles.grid}>
						<Button
							title={"Back"}
							icon={{
								name: "arrow-left",
								color: "white",
							}}
							onPress={() => {
								navigation.jumpTo("Screening");
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
								(!intake.demographics.age &&
									!intake.demographics.gender_identity &&
									!intake.demographics.race.length > 0 &&
									!intake.demographics.income_level) ||
								validateSave()
							}
							onPress={() => {
								navigation.jumpTo("Consents");
							}}
							buttonStyle={styles.nextBtn}
							titleStyle={{
								marginLeft: 15,
							}}
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
		marginBottom: 10,
	},
	dropdownContainer: {
		position: "relative",
		width: "100%",
		height: "auto",
		marginBottom: 15,
	},
});
