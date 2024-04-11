import { SafeAreaView, StyleSheet, View, Modal } from "react-native";
import { Text, SpeedDial, Button } from "@rneui/themed";
import { useEffect, useState, useRef } from "react";
import MCIcons from "../components/MCIcons/MCIcons";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";


import IncentiveScreen from "./IncentiveScreen";
import CalendarScreen from "./CalendarScreen";
import SurveyScreen from "./SurveyScreen";
import { useDispatch, useSelector } from "react-redux";
import { staffGetBikes, getMyBike } from "../redux/thunks/private/staffBikeThunk";
import { clearOrgBikes } from "../redux/slices/private/orgBikeSlice";
import { clearMyBike } from "../redux/slices/private/staffBikeSlice";
import { clearDistance } from "../redux/slices/distanceSlice";
import { getUserTravelStats } from "../redux/thunks/userRidesThunk";



export default function HomeScreen() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const travelStats = useSelector((store) => store.travelStats);

	const [openSD, setOpenSD] = useState(false);
	useEffect(()=>{
		dispatch(getUserTravelStats(user.user_id))
	},[])


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
	const openSurveyScreen = () => {
		setToggle({ ...toggle, surveys: !toggle.surveys });
		setOpenSD(!openSD);
	};




	if (user.username !== "finish_set_up") {
		return (
			<SafeAreaView>
				<View style={styles.container}>
					<View style={styles.sectionView}>
						<View
							style={{ alignItems: "flex-start", width: "100%" }}
						>
							<Text>Total Rides: {travelStats.rides_total}</Text>
							<Text>
								Total Miles:{" "}
								{parseFloat(travelStats.miles_total.toFixed(2))}{" "}
								mi
							</Text>
							<Text>
								Work Rides: {travelStats.commute_rides_total}
							</Text>
							<Text>
								Miles from work rides:{" "}
								{parseFloat(
									travelStats.commute_miles_total.toFixed(2)
								)}{" "}
								mi
							</Text>
						</View>
						<View>
							<Text>Welcome {user.username}</Text>
						</View>
						<View></View>
						{/* <Button
							raised
							onPress={() => {
								dispatch(staffGetBikes(user.org_id));
							}}
						>
							get org bikes
						</Button>
						<Button
							raised
							onPress={() => {
								dispatch(getMyBike(user.user_id));
							}}
						>
							get my bike
						</Button>
						<Button
							raised
							onPress={() => {
								dispatch(clearMyBike());
							}}
						>
							clear my bike
						</Button>
						<Button
							raised
							onPress={() => {
								dispatch(clearOrgBikes());
							}}
						>
							clear orgBikes
						</Button>
						<Button
							raised
							onPress={() => {
								dispatch(clearDistance());
							}}
						>
							clear distance
						</Button> */}

						<ModalWrapper
							visible={toggle.incentives}
							action={setToggle}
							screen={"incentives"}
							component={IncentiveScreen}
						/>
						<ModalWrapper
							visible={toggle.events}
							action={setToggle}
							screen={"events"}
							component={CalendarScreen}
						/>
						<ModalWrapper
							visible={toggle.surveys}
							action={setToggle}
							screen={"surveys"}
							component={SurveyScreen}
						/>
					</View>
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
				</View>
			</SafeAreaView>
		);
	} else {
		return <View></View>;
	}
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
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		backgroundColor: "#fff",
		marginVertical: 10,
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
