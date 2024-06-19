import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

import { Platform, Easing, Alert} from "react-native";
import RideScreen from "../../screens/RideScreen";
import RideTrackingScreen from "../../screens/RideTrackingScreen";
import RideSurveyScreen from "../../screens/RideSurveyScreen";
import { useDispatch, useSelector } from "react-redux";
import { clearCommuteSlice } from "../../redux/slices/commuteSlice";
import { useNavigation } from "@react-navigation/native";
import { stopLocationTracking } from "../../tasks/BackgroundLocationTaskManager";
import { clearDistance } from "../../redux/slices/distanceSlice";

const Stack = createStackNavigator();
export default function RideScreenStackNav({ action }) {
	const dispatch = useDispatch();
    const navigation = useNavigation()

	const styleOptions = {
		headerStyle: { backgroundColor: "#1269A9" },
		headerTintColor: "#FFFAF2",
	};

	const distance = useSelector((store) => store.distance);

	const { hide, setHide } = action;

	const navigateHome = (nav) => {
		// nav.pop();
		navigation.goBack();
		// navigation.navigate("RideScreen");
		navigation.navigate("HomeScreen");
	};

	const forceQuitRide = async (e) => {
        try {
            if (distance.is_tracking) {
                await stopLocationTracking();
                dispatch(clearDistance());
                e.returnValue = true
			}
            // navigateHome(nav);
		} catch (error) {
			console.log("TRACKING STOPPED ERROR!:", error);
		}
	};

	const handleQuitRide = () => {
		Alert.alert(
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
	};

	const skipSurvey = () => {
		dispatch(clearCommuteSlice());
		navigateHome();
	};

	return (
		<Stack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerStyle: { backgroundColor: "#1269A9" },
				headerTintColor: "#FFFAF2",
				headerTitleStyle: { fontWeight: "bold" },
				...TransitionPresets.SlideFromRightIOS,
				// Customizing the transition animation
				transitionSpec: {
					open: {
						animation: "timing",
						config: {
							duration: 300,
							easing: Easing.out(Easing.poly(4)),
						},
					},
					close: {
						animation: "timing",
						config: {
							duration: 300,
							easing: Easing.in(Easing.poly(4)),
						},
					},
				},
				// Customize the card style during the transition
				cardStyleInterpolator: ({ current, next, layouts }) => {
					return {
						cardStyle: {
							transform: [
								{
									translateX: current.progress.interpolate({
										inputRange: [0, 1],
										outputRange: [layouts.screen.width, 0],
									}),
								},
							],
						},
						opacity: current.progress,
					};
				},
			})}
			screenListeners={({ route, navigation }) => ({
				state: (e) => {
					console.log("ROUTE", route.name);
					route.name === "RideScreen"
						? setHide(false)
						: setHide(true);
				},
				beforeRemove: (e) => {
					if (route.name === "StartRiding") {
                        if(distance.is_tracking){
                            console.log('EVENT', e);
                            e.preventDefault();
                        }
						Alert.alert(
							"Would you like to abandon this ride?",
							"Choosing 'Quit Ride' will cancel this ride and it will not count toward your challenge progress\n\nChoosing 'Continue Riding' will close this message and you can continue tracking your ride.",
							[
								{
									text: "Quit Ride",
									onPress: async (e) =>  {
                                        await forceQuitRide(navigation)
                                        navigateHome()

                                    }
								},
								{
									text: "Continue Riding",
									style: "cancel",
								},
							],
							{ cancelable: false }
						);
					} else if (route.name === "RideSurvey") {
						e.preventDefault();
						return Alert.alert(
							"Confirm Skip",
							"Do you want to skip the survey?",
							[
								{ text: "No", style: "cancel" },
								{
									text: "Yes",
									onPress: () => skipSurvey(),
								},
							]
						);
					} else {
						navigation.navigate('RideScreen')
					}
				},
			})}
		>
			<Stack.Screen
				name="RideScreen"
				component={RideScreen}
				options={{
					...styleOptions,
					title: "Ride",
				}}
			/>
			<Stack.Screen
				name="StartRiding"
				component={RideTrackingScreen}
				options={{
					...styleOptions,
					title: "Start Riding",
					headerBackTitle: "Quit Ride",
					headerBackTitleStyle: { fontSize: 18 },
				}}
			/>
			<Stack.Screen
				name="RideSurvey"
				component={RideSurveyScreen}
				options={{
					...styleOptions,
					title: "Ride Survey",
					headerBackTitle: "Skip",
					headerBackTitleStyle: { fontSize: 18 },
				}}
			/>
		</Stack.Navigator>
	);
}
