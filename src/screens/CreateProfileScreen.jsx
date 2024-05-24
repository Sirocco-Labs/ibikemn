import "react-native-gesture-handler";

import MCIcons from "../components/MCIcons/MCIcons";
import IntakeFormUserInfo from "../components/IntakeFormUserInfo/IntakeFormUserInfo";
import IntakeFormAddress from "../components/IntakeFormAddress/IntakeFormAddress";
import IntakeFormScreening from "../components/IntakeFormScreening/IntakeFormScreening";
import IntakeFormDemographics from "../components/IntakeFormDemographics/IntakeFormDemographics";
import IntakeFormConsents from "../components/IntakeFormConsents/IntakeFormConsents";
import IntakeFormSubmit from "../components/IntakeFormSubmit/IntakeFormSubmit";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SafeAreaView, View, StyleSheet, Platform } from "react-native";

export default function CreateProfileScreen() {
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
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="User"
				screenOptions={({ navigation, route }) => ({
					tabBarStyle: tabStyle,
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
					tabBarActiveTintColor: "#F7B247",
					tabBarInactiveTintColor: "#FFF",
				})}
			>
				<Tab.Screen
					name="User"
					options={{ ...styleOptions, title: "Personal Information" }}
					component={IntakeFormUserInfo}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Address"
					options={{
						...styleOptions,
						title: "Home and Work Addresses",
					}}
					component={IntakeFormAddress}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Screening"
					options={{ ...styleOptions, title: "Initial Screening" }}
					component={IntakeFormScreening}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Demographics"
					options={{
						...styleOptions,
						title: "Demographics Information",
					}}
					component={IntakeFormDemographics}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Consents"
					options={{ ...styleOptions, title: "Consents" }}
					component={IntakeFormConsents}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
						},
					})}
				/>
				<Tab.Screen
					name="Submit"
					options={{ ...styleOptions, title: "Review and Submit" }}
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
