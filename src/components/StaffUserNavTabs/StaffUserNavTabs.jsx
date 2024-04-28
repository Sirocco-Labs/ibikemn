import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import RideScreen from "../../screens/RideScreen";
import UserAccountScreen from "../../screens/UserAccountScreen";
import CalendarScreen from "../../screens/CalendarScreen";
import SurveyScreen from "../../screens/ResourcesScreen";
import IncentiveScreen from "../../screens/IncentiveScreen";
import BikeListScreen from "../../screens/private/BikeListScreen";

export default function StaffUserNavTabs() {
	const Tab = createBottomTabNavigator();
	const styleOptions = {
		headerStyle: { backgroundColor: "#1269A9" },
		headerTintColor: "#FFFAF2",
	};
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={({ route }) => ({
					tabBarStyle: {
						height: 50,
						padding: 2,
						backgroundColor: "#1269A9",
					},
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
							iconName = focused ? "account" : "account-outline";
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
					component={HomeScreen}
					options={styleOptions}
				/>
				<Tab.Screen
					name="Account"
					component={UserAccountScreen}
					options={styleOptions}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
