import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocationPreferences } from "../redux/slices/preferenceSlice";
import { Alert, Linking } from "react-native";

// import * as Linking from "expo-linking";

export const InitialLocationPermissionRequest = async (dispatch) => {
	const checkFirst = await Location.hasServicesEnabledAsync();
	console.log("LOCO CHECK", checkFirst);

	if (checkFirst) {
		const { status: foregroundStatus } =
			await Location.requestForegroundPermissionsAsync();
		const { status: backgroundStatus } =
			await Location.requestBackgroundPermissionsAsync();
		console.log("LOCO foregroundStatus ", foregroundStatus);
		console.log("LOCO backgroundStatus ", backgroundStatus);

		// Combine the results of both permission requests
		const combinedStatus =
			foregroundStatus === "granted" && backgroundStatus === "granted"
				? "granted"
				: "denied";

		if (combinedStatus !== "granted") {
			return Alert.alert(
				"Location Permission Required",
				`iBikeMN needs to access your location in both the foreground and background, please choose "Allow all the time"`,
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
	} else {
		console.log("LOCO WITHOUT STATUS", checkFirst);
		const choice = checkFirst.status === "granted";
		dispatch(setLocationPreferences(choice));
		return Alert.alert(
			"Location Services Disabled",
			"Please enable your device's location services.",
			[
				{
					text: "Enable Location Services",
					onPress: () => {
						// Open general settings
						// Linking.openSettings();

						// Optionally, show a message on how to navigate to location settings
						Alert.alert(
							"Navigate to Location Settings",
							`1. Go to your device's Settings 1. Tap on 'Privacy' or 'Security & Privacy'.\n\n2. Scroll down and tap on 'Location'.\n\n3. Ensure 'Location Services' is turned on.
									`,

							[
								{
									text: "Open Settings",
									onPress: () => {
										Linking.openSettings();
									},
								},
								{
									text: "Cancel",
									style: "cancel",
								},
							]
						);
					},
				},
				{
					text: "Cancel",
					style: "cancel",
				},
			]
		);
	}

	// const { status } = await Location.requestBackgroundPermissionsAsync();
	// if (status !== "granted") {
	// 	// Display a reminder to the user
	// 	return Alert.alert(
	// 		"Location Services Disabled",
	// 		"Please enable location services for this app in your device settings.",
	// 		[
	// 			{
	// 				text: "Open Settings",
	// 				onPress: () => Linking.openSettings(),
	// 			},
	// 			{
	// 				text: "Cancel",
	// 				style: "cancel",
	// 			},
	// 		]
	// 	);
	// }else{

	//     const choice = status === "granted";

	//     dispatch(setLocationPreferences(choice));

	//     return choice;
	// }
};

// export const CheckLocationPermission = async () => {
// 	const { status } = await Location.getPermissionsAsync();
// 	if (status !== "granted") {
// 		// Display a reminder to the user
// 		Alert.alert(
// 			"Location Services Disabled",
// 			"Please enable location services for this app in your device settings.",
// 			[
// 				{
// 					text: "Open Settings",
// 					onPress: () => Linking.openSettings(),
// 				},
// 				{
// 					text: "Cancel",
// 					style: "cancel",
// 				},
// 			]
// 		);
// 	}
// };
