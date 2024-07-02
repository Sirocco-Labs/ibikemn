import ModalWrapper from "../ModalWrapper/ModalWrapper";
import CalendarScreen from "../../screens/CalendarScreen";

import { Text, SpeedDial, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";

export default function CustomSpeedDial() {
	const [openSD, setOpenSD] = useState(false);
	const [didMount, setDidMount] = useState(false);
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

	const openIncentiveScreen = () => {
		navigation.navigate("Incentive");
		setOpenSD(false);
	};
	const openCalendarScreen = () => {
		setToggle({ ...toggle, events: !toggle.events });
		setOpenSD(false);
	};
	const openResourcesScreen = () => {
		navigation.navigate("Resources");
		setOpenSD(false);
	};
	const openPedalPalsScreen = () => {
		navigation.navigate("Pedal Pals");
		setOpenSD(false);
	};
	useEffect(()=>{
		setDidMount(true)
		setOpenSD(false)
	},[])
	const handleSDToggle = () =>{
		setOpenSD(!openSD)

	}
	return (
		<>
			<ModalWrapper
				visible={toggle.events}
				action={setToggle}
				screen={"Events"}
				component={CalendarScreen}
			/>

			<SpeedDial
				isOpen={openSD}
				icon={{ name: "menu", color: "#1269A9" }}
				openIcon={{ name: "close", color: "#F7B247" }}
				onOpen={handleSDToggle}
				onClose={handleSDToggle}
				color={openSD ? "#1269A9" : "#F7B247"}
				labelPressable={true}
				transitionDuration={150}
				// color="#1269A9"
				visible={didMount}
			>
				<SpeedDial.Action
					icon={{
						type: "material-community",
						name: "trophy-variant",
						color: "#F7B247",
						size: 20,
					}}
					iconContainerStyle={{
						justifyContent: "center",
						alignItems: "center",
					}}
					title="Challenges"
					titleStyle={styles.titleStyle}
					onPress={openIncentiveScreen}
					color="#1269A9"
					// color="#F7B247"
				/>
				<SpeedDial.Action
					icon={{
						type: "material-community",
						name: "calendar-month",
						color: "#F7B247",
						size: 20,
					}}
					iconContainerStyle={{
						justifyContent: "center",
						alignItems: "center",
					}}
					title="Events"
					titleStyle={styles.titleStyle}
					onPress={openCalendarScreen}
					color="#1269A9"
					// color="#F7B247"
				/>
				<SpeedDial.Action
					size="large"
					icon={{
						type: "material-community",
						name: "star-shooting",
						color: "#F7B247",
						size: 20,
					}}
					iconContainerStyle={{
						justifyContent: "center",
						alignItems: "center",
					}}
					title={"Resources"}
					titleStyle={styles.titleStyle}
					onPress={openResourcesScreen}
					color="#1269A9"
					// color="#F7B247"
				/>
				<SpeedDial.Action
					size="large"
					icon={{
						type: "material-community",
						name: "emoticon-cool",
						color: "#F7B247",
						size: 20,
					}}
					iconContainerStyle={{
						justifyContent: "center",
						alignItems: "center",
					}}
					title={"Pedal Pals"}
					titleStyle={styles.titleStyle}
					onPress={openPedalPalsScreen}
					color="#1269A9"
					// color="#F7B247"
				/>
			</SpeedDial>
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