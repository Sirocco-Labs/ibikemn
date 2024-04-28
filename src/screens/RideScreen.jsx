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

import { setIsProgressUpdated } from "../redux/slices/incentiveSlice";

import RideSurveyScreen from "./RideSurveyScreen";
import RideTrackingScreen from "./RideTrackingScreen";

import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";

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
				// (FIND ME)
				dispatch(setIsProgressUpdated(false))
				dispatch(setRideStartTime(new Date().toISOString()));
				await startLocationTracking(dispatch);
			}
		} catch (error) {
			console.log("TRACKING STARTED ERROR!", error);
		}
	};

	return (
		<ScreenWrapper background={{ backgroundColor: "#fff" }}>
			<View style={styles.sectionView}>
				<View style={styles.cenColBe}>
					<Text style={styles.medText}>Are you riding to work?</Text>
					<View style={styles.buttonWrapper}>
						<Button
							buttonStyle={{ width: 300, padding: 15 }}
							raised
							fullWidth
							onPress={() => {
								dispatch(chooseWorkCommute());
								handleStartTracking();
							}}
						>
							YES
						</Button>
					</View>
					<View style={styles.buttonWrapper}>
						<Button
							raised
							buttonStyle={{ width: 300, padding: 15 }}
							onPress={() => {
								handleStartTracking();
							}}
						>
							NO
						</Button>
					</View>
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
		</ScreenWrapper>
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
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	cenColBe: {
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},

	// sectionView: {
	// 	display: "flex",
	// 	flexDirection: "column",
	// 	alignItems: "center",
	// 	justifyContent: "space-evenly",
	// 	width: "100%",
	// 	padding: 15,
	// 	backgroundColor: "#fff",
	// 	marginVertical: 10,
	// },
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
	buttonWrapper: {
		flex:1,
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		marginVertical: 25,
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
