import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RideScreen from "../../screens/RideScreen";
import UserAccountScreen from "../../screens/UserAccountScreen";
import BikeListScreen from "../../screens/private/BikeListScreen";
import HomeScreenStackNav from "../HomeScreenStackNav/HomeScreenStackNav";
import RideScreenStackNav from "../RideScreenStackNav/RideScreenStackNav";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Platform, StatusBar } from "react-native";
import { useState } from "react";

import Toast from "react-native-toast-message";

export default function StaffUserNavTabs() {
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
							} else if (route.name === "Bikes") {
								iconName = focused ? "bike-fast" : "bike";
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
						name="Bikes"
						component={BikeListScreen}
						options={styleOptions}
					/>
					<Tab.Screen
						name="Ride"
						component={RideScreen}
						options={styleOptions}
					/>
					<Tab.Screen
						name="Home"
						children={() => (
							<HomeScreenStackNav action={{ hide, setHide }} />
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
