import { SafeAreaView, StyleSheet, View, Modal } from "react-native";
import { Text, SpeedDial } from "@rneui/themed";
import { useState } from "react";
import MCIcons from "../components/MCIcons/MCIcons";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";

import IncentiveScreen from "./IncentiveScreen";
import CalendarScreen from "./CalendarScreen";
import SurveyScreen from "./SurveyScreen";

export default function HomeScreen() {
	const [openSD, setOpenSD] = useState(false);
    const dialogSwitch = {
        incentive:false,
        events: false,
        survey: false,
    }
    const [toggle, setToggle] = useState(dialogSwitch)
    const visible = {
        toggle,
        setToggle
    }

    const openIncentiveScreen = () =>{
        setToggle({...toggle, incentive:!toggle.incentive})
        setOpenSD(!openSD);
    }
    const openCalendarScreen = () =>{
        setToggle({...toggle, events:!toggle.incentive})
        setOpenSD(!openSD);
    }
    const openSurveyScreen = () =>{
        setToggle({...toggle, survey:!toggle.incentive})
        setOpenSD(!openSD);
    }

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Text>Home Screen</Text>
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
						title="Incentives"
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
							name: "thought-bubble",
							color: "#F7B247",
							size: 25,
						})}
						title={"Survey"}
						titleStyle={{
							fontWeight: "bold",
						}}
						onPress={openSurveyScreen}
						color="#1269A9"
						// color="#F7B247"
					/>
				</SpeedDial>
				<ModalWrapper
					visible={toggle.incentive}
					action={setToggle}
					screen={"incentive"}
					component={IncentiveScreen}
				/>
				<ModalWrapper
					visible={toggle.events}
					action={setToggle}
					screen={"events"}
					component={CalendarScreen}
				/>
				<ModalWrapper
					visible={toggle.survey}
					action={setToggle}
					screen={"survey"}
					component={SurveyScreen}
				/>
			</View>
		</SafeAreaView>
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
