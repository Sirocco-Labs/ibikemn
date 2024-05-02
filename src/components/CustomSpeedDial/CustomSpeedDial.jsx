import { useEffect, useState, useRef } from "react";
import MCIcons from "../MCIcons/MCIcons";
import { Text, SpeedDial, Button } from "@rneui/themed";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

import IncentiveScreen from "../../screens/IncentiveScreen";
import CalendarScreen from "../../screens/CalendarScreen";
import ResourcesScreen from "../../screens/ResourcesScreen";

import { useDispatch, useSelector } from "react-redux";


export default function CustomSpeedDial() {
	const [openSD, setOpenSD] = useState(false);

	const dialogSwitch = {
		incentives: false,
		events: false,
		surveys: false,
	};
	const [toggle, setToggle] = useState(dialogSwitch);
	const visible = {
		toggle,
		setToggle,
	};

	const openIncentiveScreen = () => {
		setToggle({ ...toggle, incentives: !toggle.incentives });
		setOpenSD(!openSD);
	};
	const openCalendarScreen = () => {
		setToggle({ ...toggle, events: !toggle.events });
		setOpenSD(!openSD);
	};
	const openResourcesScreen = () => {
		setToggle({ ...toggle, surveys: !toggle.surveys });
		setOpenSD(!openSD);
	};
	return (
		<>
			<ModalWrapper
				visible={toggle.incentives}
				action={setToggle}
				screen={"Incentives"}
				component={IncentiveScreen}
			/>
			<ModalWrapper
				visible={toggle.events}
				action={setToggle}
				screen={"Events"}
				component={CalendarScreen}
			/>
			<ModalWrapper
				visible={toggle.surveys}
				action={setToggle}
				screen={"Surveys"}
				component={ResourcesScreen}
			/>

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
					titleStyle={{
						fontWeight: "bold",
					}}
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
					titleStyle={{
						fontWeight: "bold",
					}}
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
					titleStyle={{
						fontWeight: "bold",
					}}
					onPress={openResourcesScreen}
					color="#1269A9"
					// color="#F7B247"
				/>
			</SpeedDial>
		</>
	);
}
