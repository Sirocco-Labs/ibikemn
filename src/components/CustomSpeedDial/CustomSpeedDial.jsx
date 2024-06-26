import MCIcons from "../MCIcons/MCIcons";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import CalendarScreen from "../../screens/CalendarScreen";

import { Text, SpeedDial, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";

export default function CustomSpeedDial() {
	const [openSD, setOpenSD] = useState(false);
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
		// setToggle({ ...toggle, challenges: !toggle.challenges });
		setOpenSD(false);
	};
	const openCalendarScreen = () => {
		// navigation.navigate("Events");
		setToggle({ ...toggle, events: !toggle.events });
		setOpenSD(false);
	};
	const openResourcesScreen = () => {
		navigation.navigate("Resources");
		// setToggle({ ...toggle, resources: !toggle.resources });
		setOpenSD(false);
	};
	const openPedalPalsScreen = () => {
		navigation.navigate("Pedal Pals");
		// setToggle({ ...toggle, resources: !toggle.resources })
		setOpenSD(false);
	};
	return (
		<>
			{/* <ModalWrapper
				visible={toggle.challenges}
				action={setToggle}
				screen={"Previous Challenges"}
				component={IncentiveScreen}
			/> */}
			<ModalWrapper
				visible={toggle.events}
				action={setToggle}
				screen={"Events"}
				component={CalendarScreen}
			/>
			{/* <ModalWrapper
				visible={toggle.resources}
				action={setToggle}
				screen={"BikeMN Resources"}
				component={ResourcesScreen}
			/> */}

			<SpeedDial
				isOpen={openSD}
				icon={{ name: "menu", color: "#1269A9" }}
				openIcon={{ name: "close", color: "#F7B247" }}
				onOpen={() => setOpenSD(!openSD)}
				onClose={() => setOpenSD(!openSD)}
				color={openSD ? "#1269A9" : "#F7B247"}
				labelPressable={true}
				transitionDuration={100}
				// color="#1269A9"
			>
				<SpeedDial.Action
					icon={MCIcons({
						name: "trophy-variant",
						color: "#F7B247",
						size: 20,
					})}
					title="Challenges"
					titleStyle={styles.titleStyle}
					onPress={openIncentiveScreen}
					color="#1269A9"
					// color="#F7B247"
				/>
				<SpeedDial.Action
					icon={MCIcons({
						name: "calendar-month",
						color: "#F7B247",
						size: 20,
					})}
					title="Events"
					titleStyle={styles.titleStyle}
					onPress={openCalendarScreen}
					color="#1269A9"
					// color="#F7B247"
				/>
				<SpeedDial.Action
					size="large"
					icon={MCIcons({
						name: "star-shooting",
						color: "#F7B247",
						size: 20,
					})}
					title={"Resources"}
					titleStyle={styles.titleStyle}
					onPress={openResourcesScreen}
					color="#1269A9"
					// color="#F7B247"
				/>
				<SpeedDial.Action
					size="large"
					icon={MCIcons({
						name: "emoticon-cool",
						color: "#F7B247",
						size: 20,
					})}
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