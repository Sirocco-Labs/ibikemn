import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StatusBar, Platform } from "react-native";

export default function AuthNavTabs() {
	const Tab = createBottomTabNavigator();
	const styleOptions = {
		headerStyle: { backgroundColor: "#1269A9" },
		headerTintColor: "#FFFAF2",
	};
	const tabStyle =
		Platform.OS === "ios"
			? {
					height: 80,
					padding: 2,
					backgroundColor: "#1269A9",
			  }
			: {
					height: 50,
					padding: 2,
					backgroundColor: "#1269A9",
			  };
	return (
		<>
			<NavigationContainer>
				<StatusBar barStyle="light-content" backgroundColor="#1269A9" />
				<Tab.Navigator
					initialRouteName="Login"
					screenOptions={({ route }) => ({
						tabBarStyle: tabStyle,
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
						tabBarActiveTintColor: "#F7B247",
						tabBarInactiveTintColor: "#FFF",
						tabBarHideOnKeyboard: true,
					})}
				>
					<Tab.Screen
						name="Login"
						component={LoginScreen}
						options={styleOptions}
					/>
					<Tab.Screen
						name="Register"
						component={RegisterScreen}
						options={styleOptions}
					/>
				</Tab.Navigator>
			</NavigationContainer>
			<Toast swipeable={true} position="bottom" bottomOffset={100} />
		</>
	);
}
