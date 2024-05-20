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
import { Text, SpeedDial, Dialog, Button, FAB } from "@rneui/themed";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearCommuteSlice,
	toggleRideStarted,
} from "../../redux/slices/commuteSlice";
import { clearDistance } from "../../redux/slices/distanceSlice";

import { stopLocationTracking } from "../../tasks/BackgroundLocationTaskManager";
import { useNavigation } from "@react-navigation/native";

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
		navigation.jumpTo("Home");
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
			navigation.jumpTo("Home");
		}
	};

	const handleNavigation = (navState) => {
		console.log("navState", navState);
		setTracker(navState);
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
				/>
			</View>
		</Modal>
	) : (
		<Modal
			transitionDuration={1000}
			animationType="slide"
			// animationType="fade"
			transparent={false}
			visible={visible}
			fullScreen={false}
			statusBarTranslucent={false}
			onRequestClose={handleBackButton}
		>
			<View
				style={{
					flex: 0,
					paddingTop: 10,
					backgroundColor: "#1269A9",
				}}
			>
				<Text
					style={{
						fontSize: 21,
						color: "#fff",
						fontWeight: "600",
						marginLeft: 15,
						marginBottom: 15,
					}}
				>
					{screen}
				</Text>
			</View>
				<Component close={close} />
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
