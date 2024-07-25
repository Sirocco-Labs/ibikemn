import {
	SafeAreaView,
	Modal,
	ScrollView,
	TouchableOpacity,
	View,
	StyleSheet,
	Alert,
	BackHandler,
	ActivityIndicator,
} from "react-native";
import { Text, Dialog, Button, FAB, Icon } from "@rneui/themed";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearCommuteSlice,
	toggleRideStarted,
} from "../../redux/slices/commuteSlice";
import { clearDistance } from "../../redux/slices/distanceSlice";

import { stopLocationTracking } from "../../tasks/BackgroundLocationTaskManager";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../ScreenWrapper/ScreenWrapper";

export default function ModalWrapper({
	visible,
	action,
	startTracking,
	stopTracking,
	header,
	screen,
	component: Component,
}) {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const webRef = useRef(null);
	const [tracker, setTracker] = useState({});
	const [loading, setLoading] = useState(false);

	const distance = useSelector((store) => store.distance);
	const commute = useSelector((store) => store.commute);

	const [rideTrack, setRideTrack] = useState(
		header === "Start Riding" ? true : false
	);

	const handleBackButton = () => {
		if (webRef.current) {
			if (tracker.canGoBack) {
				webRef.current.goBack();
				return true;
			} else {
				handleClose();
				return true;
			}
		} else {
			handleClose();
		}
		return false;
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			handleBackButton
		);
		return () => {
			backHandler.remove();
		};
	}, [visible]);

	useEffect(() => {
		if (!webRef.current) {
			setLoading(true);
		}
	}, [webRef.current]);

	const handleClose = () => {
		screen ? close() : handleQuitRide();
	};

	const close = () => {
		let target = screen.toLowerCase();
		if (screen === "Previous Challenges") {
			target = "challenges";
		}
		if (screen === "BikeMN Resources") {
			target = "resources";
		}
		action((prevState) => ({
			...prevState,
			[target]: false,
		}));
	};

	const forceQuitRide = async () => {
		navigation.navigate("HomeScreen");
		try {
			if (distance.is_tracking) {
				await stopLocationTracking();
				dispatch(clearDistance());
			}
		} catch (error) {
			console.log("TRACKING STOPPED ERROR!:", error);
		}
	};

	const handleQuitRide = () => {
		if (distance.is_tracking) {
			return Alert.alert(
				"Would you like to abandon this ride?",
				"Choosing 'Quit Ride' will cancel this ride and it will not count toward your challenge progress\n\nChoosing 'Continue Riding' will close this message and you can continue tracking your ride.",
				[
					{
						text: "Quit Ride",
						onPress: () => forceQuitRide(),
					},
					{
						text: "Continue Riding",
						style: "cancel",
					},
				],
				{ cancelable: false }
			);
		}
		if (commute.is_survey_open) {
			dispatch(clearCommuteSlice());
			navigation.navigate("HomeScreen");
		}
	};

	const handleNavigation = (navState) => {
		console.log("navState", navState);
		setTracker(navState);
	};

	const skipSurvey = () => {
		dispatch(clearCommuteSlice());
		navigation.navigate("HomeScreen");
	};
	const renderQuitOrSkip = () => {
		return header === "Start Riding" ? (
			<View
				style={{
					flex: 1,
					backgroundColor: "#1269A9",
					justifyContent: "flex-start",
					alignItems: "center",
					flexDirection: "row",
					padding: 5,
				}}
			>
			</View>
		) : (
			<View
				style={{
					flex: 1,
					backgroundColor: "#1269A9",
					justifyContent: "flex-start",
					alignItems: "center",
					flexDirection: "row",
				}}
			>
				<Button
					icon={{
						type: "material-community",
						name: "close",
						color: "#F7B247",
					}}
					buttonStyle={{ backgroundColor: "#1269A9" }}
					onPress={skipSurvey}
				>
					Skip Survey
				</Button>
			</View>
		);
	};

	return screen === "Events" ? (
		<Modal
			transitionDuration={1000}
			animationType="slide"
			transparent={false}
			visible={visible}
			fullScreen={false}
			statusBarTranslucent={false}
			onRequestClose={handleBackButton}
		>
			<View
				style={{
					flex: 1,
					paddingTop: 25,
					backgroundColor: "#1269A9",
				}}
			>
				<ActivityIndicator
					animating={!webRef.current}
					size={"large"}
					style={webRef.current ? { flex: 0 } : styles.loading}
					hidesWhenStopped
				/>
				<Component
					close={close}
					webRef={webRef}
					handleNavigation={handleNavigation}
					tracker={tracker}
					goBackWeb={handleBackButton}
				/>
				{/* <View
					style={{
						backgroundColor: "#1269A9",
						height: 10,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						padding: 5,
					}}
				></View> */}
			</View>
		</Modal>
	) : (
		<Modal
			transitionDuration={1000}
			animationType="slide"
			// animationType="fade"
			transparent={false}
			visible={visible}
			fullScreen={true}
			statusBarTranslucent={false}
			onRequestClose={handleBackButton}
		>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "flex-end",
					backgroundColor: "#1269A9",
					width: "100%",
					height: "11%",
				}}
			>
				{renderQuitOrSkip()}
			</View>
			<ScreenWrapper
				background={{ backgroundColor: rideTrack ? "#1269A9" : "#fff" }}
			>
				<Component close={close} />
			</ScreenWrapper>
		</Modal>
	);
}
const styles = StyleSheet.create({
	safe: {
		flex: 1,
	},
	scroll: {
		flexGrow: 1,
	},
	innerScroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#F7B247",
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	loading: {
		flex: 100,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		padding: 15,
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
	leftRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	rightRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	cenRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	mv10: {
		marginVertical: 10,
	},
	mt10: {
		marginTop: 10,
	},
	mr10: {
		marginRight: 10,
	},
	titleText: {
		fontWeight: "bold",
		fontSize: 20,
	},
});
