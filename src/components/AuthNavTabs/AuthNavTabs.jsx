import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";

import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, Platform } from "react-native";
import Toast from "react-native-toast-message";
import { useCallback } from "react";

export default function AuthNavTabs({actions}) {
	const Tab = createBottomTabNavigator();
	const styleOptions = {
		headerStyle: { backgroundColor: "#1269A9" },
		headerTintColor: "#FFFAF2",
	};
	const nav = useNavigation()
	useFocusEffect(
		useCallback(()=>{
			const parent = nav.getParent().getParent()
			const drawer = nav.getParent()
			console.log("Drawer", drawer);
			if(parent){
				parent.setOptions({ tabBarStyle: { display: "none" } });

			}
			if(drawer){
				drawer.setOptions({headerShown:false });

			}
			return() =>{
				if(parent){
					parent.setOptions({
						tabBarStyle: { backgroundColor: "#1269A9" },
					});
				}
				if(drawer){
					drawer.setOptions({headerShown:true });

				}

			}
		}, [nav])
	)

	const {setHeading} = actions

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
			{/* <NavigationContainer> */}
			{/* <StatusBar barStyle="light-content" backgroundColor="#1269A9" /> */}
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

						if (route.name === "Sign In") {
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
				screenListeners={({ route }) => ({
					state: () => {
						setHeading(route.name)
					},
				})}
			>
				<Tab.Screen
					name="Sign In"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Tab.Screen
					name="Register"
					component={RegisterScreen}
					options={{ headerShown: false }}
				/>
			</Tab.Navigator>
			{/* </NavigationContainer> */}
			<Toast swipeable={true} position="bottom" bottomOffset={100} />
		</>
	);
}
