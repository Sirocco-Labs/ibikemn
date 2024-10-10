import ModalWrapper from "../ModalWrapper/ModalWrapper";
import CalendarScreen from "../../screens/CalendarScreen";

import { Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";

export default function CustomDrawerContent({ route, active, drawer }) {

	const navigation = useNavigation();
	const dialogSwitch = {
		challenges: false,
		events: false,
		resources: false,
	};
	const [toggle, setToggle] = useState(dialogSwitch);
	const visible = {
		toggle,
		setToggle,
	};
	const [routes, setRoutes] = useState([
		...route.state.routeNames,
		{
			route: "Events",
			name: "BikeMN Events",
			action: () => openCalendarScreen,
		},
	]);
	useEffect(() => {
		let edit = [...routes];
		for (let i = 0; i < routes.length; i++) {
			let route = routes[i];
			if (route === "HomeScreen") {
				edit[i] = {
					route: route,
					name: "Home",
					action: () => () => openHomeScreen,
				};
			} else if (route === "AddRide") {
				edit[i] = {
					route: route,
					name: "Add a Ride",
					action: () => openAddRideScreen,
				};
			} else if (route === "Resources") {
				edit[i] = {
					route: route,
					name: "BikeMN Resources",
					action: () => openResourcesScreen,
				};
			} else if (route === "Pedal Pals") {
				edit[i] = {
					route: "Pedal Pals",
					name: "Pedal Pals",
					action: () => openPedalPalsScreen,
				};
			}
		}
		setRoutes([...edit]);
	}, [route]);

	// useEffect(() => {
	// 	console.log("*&-----routes", routes);
	// 	console.log("*&----- ACTIVE", active);
	// }, [routes]);

	const openHomeScreen = () => {
		navigation.navigate("HomeScreen");
		// setOpenSD(false);
	};
	const openAddRideScreen = () => {
		navigation.navigate("AddRide");
		// setOpenSD(false);
	};
	const openCalendarScreen = () => {
		setToggle({ ...toggle, events: !toggle.events });
		route.navigation.closeDrawer();
	};
	const openResourcesScreen = () => {
		navigation.navigate("Resources");
		// setOpenSD(false);
	};
	const openPedalPalsScreen = () => {
		navigation.navigate("Pedal Pals");
		// setOpenSD(false);
	};
	const openScreen = (path) => {
		navigation.navigate(path);
		route.navigation.closeDrawer();
	};
    const validator = (route)=>{
        if(active === route.route || active === route.name){
            return true
        }else{
            return false
        }
    }

	return (
		<>
			<ModalWrapper
				visible={toggle.events}
				action={setToggle}
				screen={"Events"}
				component={CalendarScreen}
			/>
			<View
				style={{
					flex: 1,
					justifyContent: "space-around",
					alignItems: "flex-start",
					padding: 15,
				}}
			>
				{routes.map((route, i) => (
					<Pressable
						key={i}
						style={{
							borderBottomColor: validator(route)
								? "#1269A9"
								: "",
							borderBottomWidth: validator(route) ? 2 : 0,
							width: "75%",
							marginBottom: 25,
						}}
						onPress={() => {
							route.route === "Events"
								? openCalendarScreen()
								: openScreen(route.route);
						}}
					>
						<Text
							style={{
								// marginVertical: 5,
								fontSize: 18,
								color: validator(route) ? "#1269A9" : "#fff",
								fontWeight: 700,
							}}
						>
							{route.name}
						</Text>
					</Pressable>
				))}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	titleStyle: {
		fontWeight: "bold",
		// borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "#fff",
		paddingVertical: 10, // Adjust padding as needed
		paddingHorizontal: 8,
		overflow: "hidden",
	},
});
