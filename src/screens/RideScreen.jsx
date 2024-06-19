import { SafeAreaView, View, StyleSheet, Alert, Linking} from "react-native";
import { Text, Dialog, Button } from "@rneui/themed";
import { useEffect, useState, useCallback } from "react";
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
	clearCommuteSlice,
	setRideStartTime,
	toggleRideStarted,
	toggleSurveyOpen,
} from "../redux/slices/commuteSlice";

import { setIsProgressUpdated } from "../redux/slices/incentiveSlice";

import RideSurveyScreen from "./RideSurveyScreen";
import RideTrackingScreen from "./RideTrackingScreen";

import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import ScaleButton from "../components/ScaleButton/ScaleButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { InitialLocationPermissionRequest } from "../tasks/RequestLocationPermission";

export default function RideScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const distance = useSelector((store) => store.distance);
	const commute = useSelector((store) => store.commute);
	const user = useSelector((store) => store.user);

	useFocusEffect(useCallback(()=>{
		InitialLocationPermissionRequest()
	}))

	const handleStartTracking = async () => {
		try {
			if (!distance.is_tracking) {
				// navigation.navigate("StartRiding");
				const proceed = await startLocationTracking(dispatch);
				console.log('PROCEED', proceed);
				if (proceed) {
					dispatch(toggleTrackingStatus());
					console.log("TRACKING STARTED!");
					// (FIND ME)
					// dispatch(setIsProgressUpdated(false));
					dispatch(setRideStartTime(new Date().toISOString()));
				} else {
					dispatch(clearCommuteSlice());
					Alert.alert(
						"Location Permission Required",
						`iBikeMN needs to access your location in both the foreground and background, please change your settings to "Allow all the time" or "Always".`,
						[
							{
								text: "Go to Settings",
								onPress: () => Linking.openSettings(), // Directs user to settings
							},
							{
								text: "Cancel",
								style: "cancel",
							},
						]
					);
				}
			}
		} catch (error) {
			console.log("TRACKING STARTED ERROR!", error);
		}
	};

	return (
		<ScreenWrapper background={{ backgroundColor: "#fff" }}>
			<View style={styles.sectionView}>
				<View style={styles.cenColAr}>
					<Text style={styles.medText}>Are you riding to work?</Text>
					<ScaleButton
						looks={[styles.solidButton, { width: 300 }]}
						onPress={() => {
							dispatch(chooseWorkCommute());
							handleStartTracking();
						}}
					>
						<Text
							style={{
								fontWeight: "700",
								color: "#fff",
								fontSize: 22,
							}}
						>
							Yes
						</Text>
					</ScaleButton>
					<ScaleButton
						looks={[styles.outlineButton, { width: 300 }]}
						onPress={() => {
							handleStartTracking();
						}}
					>
						<Text
							style={{
								fontWeight: "700",
								color: "#1269A9",
								fontSize: 22,
							}}
						>
							No
						</Text>
					</ScaleButton>
					{/* <Button
					onPress={()=>{
						dispatch(clearDistance())
					}}
					>
						reset
					</Button> */}
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
		height: "60%",
	},
	cenColAr: {
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		height: "75%",
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
	buttonWrapper: {
		flex: 1,
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
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 55,
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
