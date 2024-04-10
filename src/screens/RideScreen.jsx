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
	setRideStartTime,
	toggleRideStarted,
	toggleSurveyOpen,
} from "../redux/slices/commuteSlice";

import RideSurveyScreen from "./RideSurveyScreen";
import RideTrackingScreen from "./RideTrackingScreen";

export default function RideScreen() {
	const dispatch = useDispatch();

	const distance = useSelector((store) => store.distance);
	const commute = useSelector((store) => store.commute);
	const user = useSelector((store) => store.user);

	const handleStartTracking = async () => {
		try {
			if (!distance.is_tracking) {
				console.log("TRACKING STARTED!");
				dispatch(toggleTrackingStatus());
				dispatch(setRideStartTime())
				await startLocationTracking(dispatch);
			}
		} catch (error) {
			console.log("TRACKING STARTED ERROR!", error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.sectionView}>
				<Text style={styles.medText}>Are you riding to work?</Text>
				<Button
					buttonStyle={styles.button}
					onPress={() => {
						dispatch(chooseWorkCommute());
						handleStartTracking();
					}}
				>
					YES
				</Button>
				<Button
					buttonStyle={styles.button}
					onPress={() => {
						handleStartTracking();
					}}
				>
					NO
				</Button>
				<View style={styles.grid}>
					<View style={styles.gridItem}></View>
					<View style={styles.gridItem}></View>
				</View>
			</View>

			<ModalWrapper
				visible={distance.is_tracking}
				header={"Start Riding"}
				component={RideTrackingScreen}
			/>
			<ModalWrapper
				visible={commute.is_survey_open}
				header={"Tell us about your ride"}
				component={RideSurveyScreen}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
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
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
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
	medText: { fontSize: 30, marginVertical: 30 },
	regText: { fontSize: 14 },
	button: {
		justifyContent: "center",
		borderRadius: 8,
		width: 300,
		marginVertical: 30,
		padding: 15,
	},

	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: "100%",
	},
});
