import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import CommuteScreen from "../../screens/CommuteScreen";
import UserAccountScreen from "../../screens/UserAccountScreen";
import CalendarScreen from "../../screens/CalendarScreen";
import SurveyScreen from "../../screens/SurveyScreen";
import IncentiveScreen from "../../screens/IncentiveScreen";

export default function PublicUserNavTabs() {
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
						} else if (route.name === "Commute") {
							iconName = focused ? "bike-fast" : "bike";
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
				<Tab.Screen name="Commute" component={CommuteScreen} />
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Account" component={UserAccountScreen} />
			</Tab.Navigator>
		</NavigationContainer>
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
