import { useState, useRef, useCallback } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Text, Icon, Input, CheckBox } from "@rneui/themed";
import ScaleButton from "../components/ScaleButton/ScaleButton";
import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";

import { useDispatch, useSelector } from "react-redux";
import { addToAllRides } from "../redux/thunks/userRidesThunk";
import { addRideSurvey } from "../redux/thunks/rideSurveyThunk";
import { checkChallengeCompletion } from "../redux/thunks/incentiveThunk";
import { clearCommuteSlice } from "../redux/slices/commuteSlice";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function AddRideScreen({}) {
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const navigation = useNavigation();

	const userInfo = {
		user_id: user.user_id,
		publicUser: user.is_public,
		users_table_id: user.id,
	};

	const data = {
		user_id: user.user_id,
		is_work_commute: true,
		distance_traveled: "",
		ride_start_time: "",
		ride_end_time: "",
	};
	const [form, setForm] = useState(data);
	useFocusEffect(
		useCallback(() => {
			setDateTime(new Date());
		}, [dispatch])
	);

	const handleAddRide = () => {
		let payload = { ...form, ride_start_time: dateTime.toISOString() };
		const end = new Date(dateTime);
		const ride_end_time = new Date(end.getTime() + 30 * 60000);
		payload.ride_end_time = ride_end_time.toISOString();

		if (form.is_work_commute) {
			dispatch(addToAllRides(payload)).then(() => {
				finalCleanUp();
			});
		} else {
			dispatch(addToAllRides(payload)).then((response) => {
				const rideID = response.data.id;
				let destination = survey.destination.find(
					(obj) => obj.choice === true
				);
				let route = survey.route.find((value) => value.choice === true);
				let hackination = destination.title;

				if (destination.title === "Other") {
					hackination = destination.flavor;
				}
				let surveyUpdate = {
					ride_id: rideID,
					user_id: user.user_id,
					is_replace_transit: survey.is_replace_transit,
					is_solo: survey.is_solo,
					destination_type: hackination,
					route_type: route.title,
				};

				leisureRideSequence(surveyUpdate);
			});
		}
	};

	const leisureRideSequence = (surveyUpdate) => {
		dispatch(addRideSurvey(surveyUpdate)).then(() => {
			finalCleanUp();
		});
	};

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
	const [survey, setSurvey] = useState(surveyData);
	const [dateTime, setDateTime] = useState(new Date());
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const toggle = { date: false, time: false };
	const [show, setShow] = useState(toggle);
	const [open, setOpen] = useState(false);

	const changeDateTime = (event, selectedDateTime) => {
		const currentDateTime = selectedDateTime;
		console.log("&&& SELECTED DATETIME", selectedDateTime);

		setDateTime(currentDateTime);
	};
	const changeDate = (event, selectedDate) => {
		const currentDate = selectedDate;
		console.log("&&& SELECTED DATETIME", selectedDate);

		setDate(currentDate);
	};
	const changeTime = (event, selectedTime) => {
		const currentTime = selectedTime;
		console.log("&&& SELECTED TIME", selectedTime);

		setTime(currentTime);
	};

	const finalCleanUp = () => {
		dispatch(checkChallengeCompletion(userInfo));
		setSurvey(surveyData);
		setForm(data);
		setDateTime(new Date());
		dispatch(clearCommuteSlice());
		navigation.navigate("HomeScreen");
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : null}
			keyboardVerticalOffset={100}
		>
			<ScreenWrapper>
				<View style={styles.sectionView}>
					<View style={styles.leftColAr}>
						<Text style={styles.fieldTitle}>
							When was your ride?
						</Text>
						<View style={{ justifyContent:'center', alignItems:'center', width:'100%'}}>
							<Text style={{ textAlign: "center", fontSize: 13 }}>
								{dateTime.toLocaleTimeString("en-US", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</Text>
                            <ScaleButton>
                                <Text>
                                    Choose Date

                                </Text>
                            </ScaleButton>
						</View>
						<View
							style={{
								overflow: "hidden",
								height: 125,
								// borderWidth: 2,
								// borderRadius: 5,
								justifyContent: "center",
								marginVertical: 10,
								alignSelf: "left",
							}}
						>
							<DatePicker
								// locale="en-us"
								is24hourSource={"device"}
								onDateChange={setDateTime}
								maximumDate={new Date()}
								date={dateTime}
								minuteInterval={5}
								// modal
								// open={open}
								// onConfirm={(date) => {
								// 	setOpen(false);
								// 	setDateTime(date);
								// }}
								// onCancel={() => {
								// 	setOpen(false);
								// }}
							/>
						</View>
						{/* <View
							style={{
								// flex: 1,
								flexDirection: "row",
								justifyContent: "flex-start",
								alignItems: "center",
								// width: "100%",
							}}
						>
							{Platform.OS === "ios" ? (
								<DateTimePicker
									timeZoneName={"America/Chicago"}
									minuteInterval={15}
									maximumDate={new Date()}
									value={dateTime}
									mode={"datetime"}
									is24Hour={false}
									onChange={changeDateTime}
								/>
							) : (
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									{show.date && (
										<DateTimePicker
											timeZoneName={"America/Chicago"}
											minuteInterval={15}
											maximumDate={new Date()}
											value={date}
											mode={"date"}
											is24Hour={false}
											onChange={changeDate}
										/>
									)}
									{show.time && (
										<DateTimePicker
											timeZoneName={"America/Chicago"}
											minuteInterval={15}
											maximumDate={new Date()}
											value={time}
											mode={"time"}
											is24Hour={false}
											onChange={changeTime}
										/>
									)}
									<Text
										style={{ marginHorizontal: 5 }}
										onPress={() => {
											setOpen(true);
										}}
									>
										Choose
									</Text>
									<Text
										style={{ marginHorizontal: 5 }}
										onPress={() => {
											setShow({ ...show, date: true });
										}}
									>
										{" "}
										MM/DD/YYYY
									</Text>
									<Text style={{ marginHorizontal: 5 }}>
										__:__ AM/PM
									</Text>
								</View>
							)}
						</View> */}
						<View
							style={{
								marginVertical: 5,
								width: "100%",
								flexDirection: "row",
								justifyContent: "flex-start",
								alignItems: "center",
							}}
						>
							<View
								style={
									{
										// width: "40%",
									}
								}
							>
								<Text style={styles.fieldTitle}>
									How far did you ride?
								</Text>
							</View>
							<View
								style={{
									width: "30%",
									flexDirection: "row",
									justifyContent: "flex-start",
									alignItems: "center",
								}}
							>
								<Input
									inputContainerStyle={{
										width: "60%",
										marginHorizontal: 10,
										alignItems: "flex-end",
									}}
									inputStyle={{
										marginTop: 10,
										paddingLeft: 2,
										textAlign: "center",
									}}
									value={form.distance_traveled}
									keyboardType="numeric"
									onChangeText={(value) => {
										setForm({
											...form,
											distance_traveled: value,
										});
									}}
								/>

								<Text
									style={{
										fontSize: 15,
										marginLeft: -35,
										color: "#707070",
									}}
								>
									(miles)
								</Text>
							</View>
						</View>
						<Text style={styles.fieldTitle}>
							Was this ride a work commute?
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<CheckBox
								title={"Yes"}
								checked={form.is_work_commute === true}
								onPress={() => {
									setForm({
										...form,
										is_work_commute: true,
									});
								}}
							/>
							<CheckBox
								title={"No"}
								checked={form.is_work_commute === false}
								onPress={() => {
									setForm({
										...form,
										is_work_commute: false,
									});
								}}
							/>
						</View>
					</View>
				</View>

				<View style={styles.sectionView2}>
					{!form.is_work_commute ? (
						<View style={{ flex: 1 }}>
							<View>
								<View>
									<Text style={styles.smallFieldTitle}>
										Was this a trip you would normally take
										by car or transit?
									</Text>
									<View style={styles.gridCB}>
										<View style={styles.gridItemCB}>
											<CheckBox
												title={"Yes"}
												checked={
													survey.is_replace_transit
												}
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
													survey.is_replace_transit ===
													false
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
														is_solo: last.is_solo
															? null
															: true,
													}));
												}}
											/>
										</View>
										<View style={styles.gridItemCB}>
											<CheckBox
												title={"In a group"}
												checked={
													survey.is_solo === false
												}
												onPress={() => {
													setSurvey((last) => ({
														...last,
														is_solo:
															last.is_solo !==
															false
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
								<Text style={styles.fieldTitle}>
									Where did you go?
								</Text>
								<View style={styles.gridCB}>
									{destinationData.map(
										(box, i) =>
											box.title !== "Other" && (
												<View
													style={
														styles.lastGridItemCB
													}
													key={i}
												>
													<CheckBox
														iconRight={false}
														title={box.title}
														checked={
															survey.destination[
																i
															].choice
														}
														onPress={() => {
															setSurvey({
																...survey,
																destination:
																	survey.destination.map(
																		(
																			object,
																			index
																		) =>
																			index ===
																				i && {
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
												destination:
													survey.destination.map(
														(object) =>
															object.title ===
																"Other" && {
																...object,
																flavor: text,
															}
													),
											})
										}
										onEndEditing={() => {
											setSurvey({
												...survey,
												destination:
													survey.destination.map(
														(object) =>
															object.title ===
																"Other" && {
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
										<View
											style={styles.lastGridItemCB}
											key={i}
										>
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
						</View>
					) : (
						<View style={{ flex: 1 }}>
							<Text></Text>
						</View>
					)}
				</View>
				<View>
					<ScaleButton
						looks={[styles.solidButton, { width: 200 }]}
						onPress={handleAddRide}
					>
						<Text
							style={{
								fontSize: 18,
								color: "#fff",
								fontWeight: 700,
							}}
						>
							Submit
						</Text>
					</ScaleButton>
				</View>
			</ScreenWrapper>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	sectionView2: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
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
	cenRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	sectionText: {
		fontWeight: "700",
		fontSize: 25,
		color: "#1269A9",
		marginTop: 15,
	},
	rewardTitle: {
		fontWeight: "700",
		fontSize: 18,
		color: "#1269A9",
		marginBottom: 15,
	},
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
		marginVertical: 5,
	},
	buttonCol: {
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	outlineButton: {
		borderWidth: 1.5,
		borderColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
	},
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
		// marginBottom: 15,
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
});
