import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocationPreferences } from "../redux/slices/preferenceSlice";
import { Alert, Linking } from "react-native";

export const InitialLocationPermissionRequest = async (dispatch) => {
	const checkFirst = await Location.hasServicesEnabledAsync();

	if (checkFirst) {
		const { status: foregroundStatus } =
			await Location.requestForegroundPermissionsAsync();
		// Combine the results of both permission requests
		const { status: backgroundStatus } =
			await Location.requestBackgroundPermissionsAsync();
		const combinedStatus =
			foregroundStatus === "granted" && backgroundStatus === "granted"
				? "granted"
				: "denied";

		if (combinedStatus !== "granted") {
			return Alert.alert(
				"Location Permission",
				`iBikeMN needs to access your location in both the foreground and background.
				\nThis app uses the change in distance between GPS coordinates captured while riding to calculate your distance traveled.
				\nThe process starts in the foreground when you press the "Start Riding" button, and ends when you press the "Finish Riding" button.
				\nIf you switch apps or lock your screen the app switches to using location in the background.

				\nIn order to ensure your travel is accurately calculated, please change your settings to "Allow all the time" or "Always" so that the app can switch between foreground and background location access seamlessly.`,
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
		// if (foregroundStatus !== "granted" || backgroundStatus !== "granted") {
		// 	return Alert.alert(
		// 		"Location Permission Required",
		// 		`iBikeMN needs to access your location in both the foreground and background, please change your settings to "Allow all the time" or "Always".`,
		// 		[
		// 			{
		// 				text: "Go to Settings",
		// 				onPress: () => Linking.openSettings(), // Directs user to settings
		// 			},
		// 			{
		// 				text: "Cancel",
		// 				style: "cancel",
		// 			},
		// 		]
		// 	);
		// }
	} else {
		return Alert.alert(
			"Location Services Disabled",
			"Please enable your device's GPS location services.",
			[
				{
					text: "Enable Location Services",
					onPress: () => {
						// Open general settings
						// Linking.openSettings();

						// Optionally, show a message on how to navigate to location settings
						Alert.alert(
							"Navigate to Location Settings",
							`1. Go to your device's Settings 2. Tap on 'Privacy' or 'Security & Privacy'.\n\n3. Scroll down and tap on 'Location'.\n\n4. Ensure 'Location Services' is turned on.
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
};
