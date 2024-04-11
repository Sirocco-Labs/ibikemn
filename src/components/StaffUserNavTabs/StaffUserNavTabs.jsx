import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import RideScreen from "../../screens/RideScreen";
import UserAccountScreen from "../../screens/UserAccountScreen";
import CalendarScreen from "../../screens/CalendarScreen";
import SurveyScreen from "../../screens/SurveyScreen";
import IncentiveScreen from "../../screens/IncentiveScreen";
import BikeListScreen from "../../screens/private/BikeListScreen";

export default function StaffUserNavTabs() {
	const Tab = createBottomTabNavigator();
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={({ route }) => ({
					tabBarStyle: {
						height: 50,
						padding: 2,
						// backgroundColor: "#0000ff",
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
					tabBarActiveTintColor: "#1269A9",
					tabBarInactiveTintColor: "gray",
				})}
			>
				<Tab.Screen name="Bikes" component={BikeListScreen} />
				<Tab.Screen name="Ride" component={RideScreen} />
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Account" component={UserAccountScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
