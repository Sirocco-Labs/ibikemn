import "react-native-gesture-handler";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text } from "@rneui/themed";
import MCIcons from "../components/MCIcons/MCIcons";


import IntakeFormUserInfo from "../components/IntakeFormUserInfo/IntakeFormUserInfo";
import IntakeFormAddress from "../components/IntakeFormAddress/IntakeFormAddress";
import IntakeFormScreening from "../components/IntakeFormScreening/IntakeFormScreening";
import IntakeFormDemographics from "../components/IntakeFormDemographics/IntakeFormDemographics";
import IntakeFormConsents from "../components/IntakeFormConsents/IntakeFormConsents";
import IntakeFormSubmit from "../components/IntakeFormSubmit/IntakeFormSubmit";

export default function CreateProfileScreen() {
	const Tab = createBottomTabNavigator();

	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="User"
				screenOptions={({ navigation, route }) => ({
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

						if (route.name === "User") {
							iconName = focused ? "account" : "account-outline";
						} else if (route.name === "Address") {
							iconName = focused
								? "card-account-details"
								: "card-account-details-outline";
						} else if (route.name === "Screening") {
							iconName = focused
								? "clipboard-list"
								: "clipboard-list-outline";
						} else if (route.name === "Demographics") {
							iconName = focused
								? "information"
								: "information-outline";
						} else if (route.name === "Consents") {
							iconName = focused
								? "thumbs-up-down"
								: "thumbs-up-down-outline";
						} else if (route.name === "Submit") {
							iconName = focused ? "send" : "send-lock";
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
				<Tab.Screen
					name="User"
					component={IntakeFormUserInfo}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Address"
					component={IntakeFormAddress}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Screening"
					component={IntakeFormScreening}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Demographics"
					component={IntakeFormDemographics}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Consents"
					component={IntakeFormConsents}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Submit"
					component={IntakeFormSubmit}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	mainView: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		padding: "15px",
	},
	flexCol: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 15,
	},
	flexRow: {
		flex: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginTop: 15,
	},
	bigText: { fontSize: 50 },
	medText: { fontSize: 30 },
	regText: { fontSize: 14 },
	button: {
		display: "flex",
		alignItems: "center",
		border: "1px solid transparent",
		borderRadius: "8px",
		fontSize: 15,
		width: "75%",
		marginTop: "20px",
		marginBottom: "10px",
		padding: "10px",
	},

	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: "100%",
	},
});
