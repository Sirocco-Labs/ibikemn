import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";

export default function AuthNavTabs() {
	const Tab = createBottomTabNavigator();
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Login"
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

						if (route.name === "Login") {
							iconName = focused
								? "login-variant"
								: "login-variant";
						} else if (route.name === "Register") {
							iconName = focused
								? "account-plus"
								: "account-plus-outline";
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
				<Tab.Screen name="Login" component={LoginScreen} />
				<Tab.Screen name="Register" component={RegisterScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
