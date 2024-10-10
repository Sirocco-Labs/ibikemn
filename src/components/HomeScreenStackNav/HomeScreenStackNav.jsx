import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

import {Easing} from "react-native";
import HomeScreen from "../../screens/HomeScreen";
import IncentiveScreen from "../../screens/IncentiveScreen";
import ResourcesScreen from "../../screens/ResourcesScreen";
import PedalPalsScreen from "../../screens/PedalPalsScreen";
import AddRideScreen from "../../screens/AddRideScreen";
import {
	createDrawerNavigator,
} from "@react-navigation/drawer";
import { useHeaderHeight } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import CustomDrawerContent from "../CustomDrawerContent/CustomDrawerContent";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerMenu({ action }) {

	const styleOptions = {
		headerStyle: { backgroundColor: "#1269A9" },
		headerTintColor: "#FFFAF2",
		overlayColor: "transparent",
	};
	const { hide, setHide } = action;

	const [active, setActive] = useState("");
	const [header, setHeader] = useState(0);

	return (
		<Drawer.Navigator
			screenOptions={{
				drawerStyle: {
					backgroundColor: "#F7b247",
					height: "35%",
					width: "45%",
					marginTop: header,
					borderTopRightRadius: 35,
					borderBottomLeftRadius: 35,
					borderColor: "#F7b247",
					borderWidth: 1,
				},
				drawerType: "front",
				swipeEnabled: false,
			}}
			screenListeners={({ route }) => ({
				state: () => {
					if (route.name === "HomeScreen") {
						setHide(false);
						setActive("Home");
					} else {
						setHide(true);
						setActive(route.name);
					}
				},
			})}
			drawerContent={(route, navigation) => (
				<CustomDrawerContent
					active={active}
					route={route}
					drawer={navigation}
				/>
			)}
		>
			<Drawer.Screen
				name={"HomeScreen"}
				children={() => <HomeScreenStack action={action} dynamicHeader={{header,setHeader}} />}
				options={{
					...styleOptions,
					title: "Home",
				}}
			/>
			<Drawer.Screen
				name="AddRide"
				component={AddRideScreen}
				options={{ ...styleOptions, title: "Add Ride" }}
			/>
			<Drawer.Screen
				name="Resources"
				component={ResourcesScreen}
				options={{ ...styleOptions, title: "BikeMN Resources" }}
			/>
			<Drawer.Screen
				name="Pedal Pals"
				component={PedalPalsScreen}
				options={{ ...styleOptions, title: "Pedal Pals" }}
			/>
		</Drawer.Navigator>
	);
}

function HomeScreenStack({ action, dynamicHeader }) {
	const {header, setHeader}= dynamicHeader
	const headerHeight = useHeaderHeight();
	useEffect(() => {
		setHeader(headerHeight);
	}, [headerHeight]);
	
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
				name="HomeScreenStack"
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			/>
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
			<Stack.Screen
				name="Pedal Pals"
				component={PedalPalsScreen}
				options={{ ...styleOptions, title: "Pedal Pals" }}
			/>
		</Stack.Navigator>
	);
}
export default function HomeScreenStackNav({ action }) {
	return (
		<DrawerMenu action={action} />
		// <Stack.Navigator
		// 	screenOptions={{
		// 		headerStyle: { backgroundColor: "#1269A9" },
		// 		headerTintColor: "#FFFAF2",
		// 		headerTitleStyle: { fontWeight: "bold" },
		// 		...TransitionPresets.SlideFromRightIOS,
		// 		// Customizing the transition animation
		// 		transitionSpec: {
		// 			open: {
		// 				animation: "timing",
		// 				config: {
		// 					duration: 300,
		// 					easing: Easing.out(Easing.poly(4)),
		// 				},
		// 			},
		// 			close: {
		// 				animation: "timing",
		// 				config: {
		// 					duration: 300,
		// 					easing: Easing.in(Easing.poly(4)),
		// 				},
		// 			},
		// 		},
		// 		// Customize the card style during the transition
		// 		cardStyleInterpolator: ({ current, next, layouts }) => {
		// 			return {
		// 				cardStyle: {
		// 					transform: [
		// 						{
		// 							translateX: current.progress.interpolate({
		// 								inputRange: [0, 1],
		// 								outputRange: [layouts.screen.width, 0],
		// 							}),
		// 						},
		// 					],
		// 				},
		// 				opacity: current.progress,
		// 			};
		// 		},
		// 	}}
		// 	screenListeners={({ route }) => ({
		// 		state: () => {
		// 			route.name === "HomeScreen"
		// 				? setHide(false)
		// 				: setHide(true);
		// 		},
		// 	})}
		// >
		// 	<Stack.Screen
		// 		name="HomeScreen"
		// 		component={HomeScreen}
		// 		options={{
		// 			...styleOptions,
		// 			title: "Home",
		// 		}}
		// 	/>
		// 	<Stack.Screen
		// 		name="Incentive"
		// 		component={IncentiveScreen}
		// 		options={{ ...styleOptions, title: "Previous Challenges" }}
		// 	/>
		// 	<Stack.Screen
		// 		name="Resources"
		// 		component={ResourcesScreen}
		// 		options={{ ...styleOptions, title: "BikeMN Resources" }}
		// 	/>
		// 	<Stack.Screen
		// 		name="Pedal Pals"
		// 		component={PedalPalsScreen}
		// 		options={{ ...styleOptions, title: "Pedal Pals" }}
		// 	/>
		// </Stack.Navigator>
	);
}
