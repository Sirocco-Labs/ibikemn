import { SafeAreaView, View, StyleSheet, Alert } from "react-native";
import { Text, Dialog, Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import haversine from "haversine";
import {
	setTotalDistance,
	toggleTrackingStatus,
	clearDistance,
} from "../redux/slices/distanceSlice";

import {
	startLocationTracking,
	stopLocationTracking,
} from "../tasks/BackgroundLocationTaskManager";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";

import {
	chooseWorkCommute,
	toggleRideStarted,
	toggleSurveyOpen,
	clearCommuteSlice,
	setRideEndTime,
} from "../redux/slices/commuteSlice";

import { addToAllRides } from "../redux/thunks/userRidesThunk";

import { useNavigation } from "@react-navigation/native";
import { updateUserIncentiveProgress } from "../redux/thunks/incentiveThunk";
import { checkChallengeCompletion } from "../redux/thunks/incentiveThunk";
import ScaleButton from "../components/ScaleButton/ScaleButton";

import * as Network from "expo-network";


export default function RideTrackingScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const distance = useSelector((store) => store.distance);
	const commute = useSelector((store) => store.commute);
	const user = useSelector((store) => store.user);


	const handleStopTracking = async () => {
		try {
			if (distance.is_tracking) {
				console.log("TRACKING STOPPED!");
				//  dispatch(setRideEndTime(new Date().toISOString()));
				await stopLocationTracking();
				// dispatch(toggleTrackingStatus());
			}
		} catch (error) {
			console.log("TRACKING STOPPED ERROR!:", error);
		}
	};

	useEffect(() => {
		if (distance.is_tracking && distance.history.length >= 2) {
			const { current, previous } = distance.location;
			let difference = haversine(previous, current, { unit: "meter" });
			if (difference) {
				dispatch(setTotalDistance(difference));
			}
		}
		console.log(
			"COMMUTE WHILE DISTANCE IS CHANGING",
			commute.ride_end_time
		);
	}, [
		distance.is_tracking,
		distance.history.length,
		distance.location.current,
		distance.location.previous,
		dispatch,
	]);

	const [time, setTime] = useState(new Date());
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const handleSubmitDistance = () => {
		console.log(
			"HANDLE SUBMIT DISTANCE COMMUTE SLICE BEFORE EVERYTHING ELSE",
			commute
		);
		const metersToMiles =
			parseFloat(distance.total.toFixed(2)) * 0.000621371192;

		const rideData = {
			user_id: user.user_id,
			is_work_commute: commute.is_work_commute,
			distance_traveled: metersToMiles,
			ride_start_time: commute.ride_start_time,
			ride_end_time: new Date().toISOString(),
		};

		console.log("rideData on tracking screen", rideData);

		const userInfo = {
			user_id: user.user_id,
			publicUser: user.is_public,
			users_table_id: user.id,
		};

		dispatch(addToAllRides(rideData))
			.then(() => {
				dispatch(clearDistance());
				if (commute.is_work_commute) {
					// (FIND ME)
					dispatch(checkChallengeCompletion(userInfo));
					dispatch(clearCommuteSlice());
					navigation.navigate("HomeScreen");
				} else {
					Alert.alert(
						"Optional Survey ",
						"Would you like to take a super quick survey to help BikeMN's grant reporting?\n\nSome challenge criteria is dependent on your survey too.",

						[
							{
								text: "Sure!",
								onPress: () => {
									dispatch(toggleSurveyOpen());
									if (commute.is_survey_open) {
										navigation.navigate("HomeScreen");
									}
								},
							},
							{
								text: "No thanks",
								style: "cancel",
								onPress: () => {
									navigation.navigate("HomeScreen");
									// dispatch(toggleSurveyOpen());
									// if (commute.is_survey_open) {
									// 		navigation.jumpTo("Home");
									// 	}
								},
							},
						],
						{ cancelable: false }
					);
				}
			})
			.catch((error) => {
				console.log("ERROR I GUESS", error);
			});
	};

	const handleEndTime = () => {
		dispatch(setRideEndTime(new Date().toISOString()));
	};

	return (
		<View style={styles.popUp}>
			<View style={styles.sectionView}>
				<View style={{ alignItems: "center" }}>
					<Text style={styles.distanceText}>Distance Traveled:</Text>
					<Text style={styles.distanceText}>
						{parseFloat(
							(distance.total * 0.000621371192).toFixed(2)
						)}{" "}
						Miles
					</Text>
				</View>
				<Text style={styles.timeText}>
					{time.toLocaleTimeString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
				<ScaleButton
					looks={[styles.solidButton, { width: 300 }]}
					onPress={() => {
						handleEndTime();
						handleStopTracking();
						handleSubmitDistance();
					}}
				>
					<Text
						style={{
							fontSize: 30,
							fontWeight: "700",
							// color:'#1269A9'
						}}
					>
						Finish Ride
					</Text>
				</ScaleButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-around",
		padding: 10,
		width: "100%",
		height: "100%",
	},
	popUp: {
		height: "90%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#1269A9",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		// borderColor:'green',
		// borderWidth:10
	},

	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		// backgroundColor: "#fff",
		marginVertical: 10,
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
	textHeader: {
		fontSize: 35,
	},
	distanceText: {
		fontSize: 35,
		color: "#fff",
	},
	timeText: {
		fontSize: 60,
		color: "#fff",
		letterSpacing:4
	},
	solidButton: {
		backgroundColor: "#F7B247",
		borderRadius: 12,
		height: 65,
		padding: 2,
	},
	solidButtonOff: {
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 45,
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
