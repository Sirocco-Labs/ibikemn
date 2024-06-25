import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

import { Platform, Easing } from "react-native";
import HomeScreen from "../../screens/HomeScreen";
import CalendarScreen from "../../screens/CalendarScreen";
import IncentiveScreen from "../../screens/IncentiveScreen";
import ResourcesScreen from "../../screens/ResourcesScreen";

const Stack = createStackNavigator();

export default function HomeScreenStackNav({ action }) {
	const styleOptions = {
		headerStyle: { backgroundColor: "#1269A9" },
		headerTintColor: "#FFFAF2",
	};
	const { hide, setHide } = action;

	return (
		<Stack.Navigator
			screenOptions={{
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
			}}
			screenListeners={({ route }) => ({
				state: () => {
					route.name === "HomeScreen"
						? setHide(false)
						: setHide(true);
				},
			})}
		>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					...styleOptions,
					title: "Home",
				}}
			/>
			{/* <Stack.Screen
				name="Events"
				component={CalendarScreen}
				options={{ title: "Events" }}
				animationEnabled
			/> */}
			<Stack.Screen
				name="Incentive"
				component={IncentiveScreen}
				options={{ ...styleOptions, title: "Previous Challenges" }}
			/>
			<Stack.Screen
				name="Resources"
				component={ResourcesScreen}
				options={{ ...styleOptions, title: "BikeMN Resources" }}
			/>
		</Stack.Navigator>
	);
}
