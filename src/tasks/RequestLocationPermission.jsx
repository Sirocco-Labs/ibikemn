import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocationPreferences } from "../redux/slices/preferenceSlice";
import { Alert, Linking } from "react-native";

export const InitialLocationPermissionRequest = async (dispatch) => {

	// const dispatch = useDispatch();
	const { status } = await Location.requestBackgroundPermissionsAsync();
	if (status !== "granted") {
		// Display a reminder to the user
		return Alert.alert(
			"Location Services Disabled",
			"Please enable location services for this app in your device settings.",
			[
				{
					text: "Open Settings",
					onPress: () => Linking.openSettings(),
				},
				{
					text: "Cancel",
					style: "cancel",
				},
			]
		);
	}else{

        const choice = status === "granted";

        dispatch(setLocationPreferences(choice));

        return choice;
    }


};

export const CheckLocationPermission = async () => {
	const { status } = await Location.getPermissionsAsync();
	if (status !== "granted") {
		// Display a reminder to the user
		Alert.alert(
			"Location Services Disabled",
			"Please enable location services for this app in your device settings.",
			[
				{
					text: "Open Settings",
					onPress: () => Linking.openSettings(),
				},
				{
					text: "Cancel",
					style: "cancel",
				},
			]
		);
	}
};