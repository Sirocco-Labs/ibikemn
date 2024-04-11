import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { setLocationCoordinates } from "../redux/slices/distanceSlice";


export const BACKGROUND_LOCATION = "background-location-task";

export const backgroundLocationTask = (dispatch) => {
	TaskManager.defineTask(
		BACKGROUND_LOCATION,
		({ data: { locations }, error }) => {
			if (error) {
				console.log("BACKGROUND LOCATION ERROR: ", error.message);
				// Handle error
				return;
			}
			if (locations) {
				let {
					coords: { latitude, longitude },
				} = locations[0];
				// Process location data
				console.log("Received locations! :", locations);
				console.log(
					`New Latitude: ${latitude}, New Longitude: ${longitude}`
				);
				const coords = { latitude, longitude };
				dispatch(setLocationCoordinates(coords));
			}
		}
	);
};

export const startLocationTracking = async (dispatch) => {
    const  foregroundStatus  =
		await Location.requestForegroundPermissionsAsync();
	if (foregroundStatus.status !== "granted") {
		console.log("Foreground permissions not granted");
		return;
	}

	const backgroundStatus  =
		await Location.requestBackgroundPermissionsAsync();
	if (backgroundStatus.status !== "granted") {
		console.log("Background permissions not granted");
		return;
	}
	await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION, {
		accuracy: Location.Accuracy.BestForNavigation,
		timeInterval: 5000,
		distanceInterval: 1,
		foregroundService: {
			notificationTitle: "Location Tracking",
			notificationBody: "Tracking your location",
			notificationColor: "#FF0000",
		},
		pausesUpdatesAutomatically: false,
	});
};

export const stopLocationTracking = async () => {
	await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION);
};