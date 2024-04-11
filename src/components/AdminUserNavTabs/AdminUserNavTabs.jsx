import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import RideScreen from "../../screens/RideScreen";
import UserAccountScreen from "../../screens/UserAccountScreen";
import BikeListScreen from "../../screens/private/BikeListScreen";
import ManageCalendarScreen from "../../screens/private/admin/ManageCalendarScreen";
import ManageDataScreen from "../../screens/private/admin/ManageDataScreen";
import ManageIncentiveScreen from "../../screens/private/admin/ManageIncentiveScreen";
import ManageOrganizationScreen from "../../screens/private/admin/ManageOrganizationScreen";

export default function AdminUserNavTabs() {
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
						} else if (route.name === "Organizations") {
							iconName = focused
								? "account-group"
								: "account-group-outline";
						} else if (route.name === "Ride") {
							iconName = focused ? "road-variant" : "road";
						} else if (route.name === "Calendar") {
							iconName = focused
								? "calendar-month"
								: "calendar-month-outline";
						} else if (route.name === "Data") {
							iconName = focused
								? "card-account-details"
								: "card-account-details-outline";
						} else if (route.name === "Milestones") {
							iconName = focused
								? "trophy-variant"
								: "trophy-variant-outline";
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
				<Tab.Screen
					name="Organizations"
					component={ManageOrganizationScreen}
				/>
				<Tab.Screen name="Ride" component={RideScreen} />
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Calendar" component={ManageCalendarScreen} />
				<Tab.Screen name="Data" component={ManageDataScreen} />
				<Tab.Screen
					name="Milestones"
					component={ManageIncentiveScreen}
				/>
				<Tab.Screen name="Account" component={UserAccountScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
