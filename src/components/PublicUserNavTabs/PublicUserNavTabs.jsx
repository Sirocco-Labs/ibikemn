import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RideScreen from "../../screens/RideScreen";
import UserAccountScreen from "../../screens/UserAccountScreen";
import HomeScreenStackNav from "../HomeScreenStackNav/HomeScreenStackNav";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Platform, StatusBar } from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function PublicUserNavTabs() {
	const Tab = createBottomTabNavigator();
	const styleOptions = {
		headerStyle: { backgroundColor: "#1269A9" },
		headerTintColor: "#FFFAF2",
	};
	const [hide, setHide] = useState(false);

	const tabStyle =
		Platform.OS === "ios"
			? {
					height: 80,
					padding: 2,
					backgroundColor: "#1269A9",
					display: hide ? "none" : "flex",
			  }
			: {
					height: 50,
					padding: 2,
					backgroundColor: "#1269A9",
					display: hide ? "none" : "flex",
			  };

	return (
		<>
			<NavigationContainer>
				<StatusBar barStyle="light-content" backgroundColor="#1269A9" />
				<Tab.Navigator
					initialRouteName="Home"
					screenOptions={({ route }) => ({
						tabBarStyle: tabStyle,
						tabBarItemStyle: {
							margin: 2,
							padding: 1,
						},
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;

							if (route.name === "Home") {
								iconName = focused
									? "home-circle"
									: "home-circle-outline";
							} else if (route.name === "Ride") {
								iconName = focused ? "road-variant" : "road";
							} else if (route.name === "Account") {
								iconName = focused
									? "account"
									: "account-outline";
							}
							return (
								<MCIcons
									name={iconName}
									size={size}
									color={color}
								/>
							);
						},
						tabBarActiveTintColor: "#F7B247",
						tabBarInactiveTintColor: "#FFF",
						tabBarHideOnKeyboard: true,
					})}
				>
					<Tab.Screen
						name="Ride"
						component={RideScreen}
						options={styleOptions}
					/>
					<Tab.Screen
						name="Home"
						children={({ route }) => (
							<HomeScreenStackNav
								action={{ hide, setHide }}
								topRoute={route}
							/>
						)}
						options={{
							headerShown: false,
						}}
					/>
					<Tab.Screen
						name="Account"
						component={UserAccountScreen}
						options={styleOptions}
					/>
				</Tab.Navigator>
			</NavigationContainer>
			<Toast swipeable={true} position="bottom" bottomOffset={100} />
		</>
	);
}

const cruft = [
	{
		// if (route.name === "Incentives") {
		// 	iconName = focused ? "carrot" : "carrot";
		// 	// iconName = focused ? "star-shooting": "star-shooting-outline"; //alternate?
		// 	// iconName = focused ? "terrain": "summit"; //alternate?
		// 	// iconName = focused ? "trophy-variant": "trophy-variant-outline"; //alternate?
		// } else if (route.name === "Events") {
		// 	iconName = focused ? "calendar-month" : "calendar-month-outline";
		// } else if (route.name === "Survey") {
		// 	iconName = focused ? "thought-bubble" : "thought-bubble-outline";
		// 	// iconName = focused
		// 	// 	? "clipboard-text"
		// 	// 	: "clipboard-text-outline"; //alternate
		// }
	},
	{
		/* <Tab.Screen name="Incentives" component={IncentiveScreen} /> */
	},
	{
		/* <Tab.Screen name="Events" component={CalendarScreen} /> */
	},
	{
		/* <Tab.Screen name="Survey" component={SurveyScreen} /> */
	},
];
