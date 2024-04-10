import { SafeAreaView, View, StyleSheet } from "react-native";
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

import {useNavigation} from '@react-navigation/native'

export default function RideTrackingScreen() {
	const dispatch = useDispatch();
    const navigation = useNavigation()

	const distance = useSelector((store) => store.distance);
	const commute = useSelector((store) => store.commute);
	const user = useSelector((store) => store.user);

	// const handleStartTracking = async () => {
	// 	try {
	// 		if (!distance.is_tracking) {
	// 			console.log("TRACKING STARTED!");
	// 			dispatch(toggleTrackingStatus());
	// 			await startLocationTracking(dispatch);
	// 		}
	// 	} catch (error) {
	// 		console.log("TRACKING STARTED ERROR!", error);
	// 	}
	// };
	const handleStopTracking = async () => {
		try {
			if (distance.is_tracking) {
				console.log("TRACKING STOPPED!");
				await dispatch(setRideEndTime());
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
		const metersToMiles =
			parseFloat(distance.total.toFixed(2)) * 0.000621371192;
		const rideData = {
			user_id: user.user_id,
			is_work_commute: commute.is_work_commute,
			distance_traveled: metersToMiles,
			ride_start_time: commute.ride_start_time,
			ride_end_time: commute.ride_end_time,
		};
		console.log("rideData on tracking screen", rideData);

		dispatch(addToAllRides(rideData));
        dispatch(clearDistance());

		if (commute.is_work_commute) {
			dispatch(clearCommuteSlice());
            navigation.jumpTo("Home")
		} else {
			dispatch(toggleSurveyOpen());
		}

	};

	return (
		<View style={styles.popUp}>
			<View style={styles.sectionView}>
				<Text style={styles.distanceText}>
					{parseFloat(distance.total.toFixed(2))}
				</Text>
				<Text style={styles.timeText}>
					{time.toLocaleTimeString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>

				<Button
					onPress={() => {
						handleStopTracking();
						handleSubmitDistance();
					}}
				>
					Finish Ride
				</Button>
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
		backgroundColor: "#fff",
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
		backgroundColor: "#fff",
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
	distanceText: {},
	timeText: {},
});
