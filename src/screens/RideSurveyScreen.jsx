import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, Dialog, Button, Input, CheckBox } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import haversine from "haversine";
import {
	setTotalDistance,
	toggleTrackingStatus,
	clearDistance,
} from "../redux/slices/distanceSlice";

import {
	startLocationTracking,
	stopLocationTracking,
} from "../tasks/BackgroundLocationTaskManager";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";

import {
	toggleRideStarted,
	toggleSurveyOpen,
    clearCommuteSlice
} from "../redux/slices/commuteSlice";
import {useNavigation} from '@react-navigation/native'

export default function RideSurveyScreen() {
	const dispatch = useDispatch();
    const navigation = useNavigation()

	const destinationData = [
		{
			title: "Errands",
			choice: false,
			flavor: "(grocery store, post office, etc)",
		},
		{
			title: "A place for recreation",
			choice: false,
			flavor: "(local park, landmark, or trail)",
		},
		{
			title: "A place for socializing",
			choice: false,
			flavor: "(a restaurant, bar, library)",
		},
		{ title: "I rode for fitness", choice: false, flavor: "" },
		{ title: "Other", choice: false, flavor: "" },
	];

	const routeData = [
		{
			title: "Bike trail",
			choice: false,
			flavor: "",
		},
		{
			title: "On road infrastructure",
			choice: false,
			flavor: "(a bike lane, cycle track)",
		},
		{
			title: "A mix of both",
			choice: false,
			flavor: "",
		},
		{
			title: "My route didn't include any bike friendly pathways",
			choice: false,
			flavor: "",
		},
	];
	const surveyData = {
		is_replace_transit: true,
		is_solo: true,
		destination: destinationData,
		route: routeData,
	};

	const [survey, setSurvey] = useState(surveyData);

	const checkForLast = (array, index) => {
		return array.length % 2 && index === array.length - 1;
	};

	const handleSubmit = () => {
		let dest;
		let destination = survey.destination.find((obj) => obj.choice === true);
		let route = survey.route.find((value) => value.choice === true);
		const payload = {
			is_replace_transit: survey.is_replace_transit,
			is_solo: survey.is_solo,
			destination: destination.title,
			route: route.title,
		};

		console.log("PAYLOAD", payload);
		console.log("destination", destination.title);
		console.log("route", route.title);
		// dispatch(addRideSurvey(payload))
        dispatch(clearCommuteSlice());
        navigation.jumpTo('Home')
	};

	// const [open, setOpen] = useState(true);

	return (
		<View style={styles.popUp}>
			<View style={styles.container}>
				<View>
					<Text>
						Was this a trip you would normally take by car or
						transit?
					</Text>
					<View style={styles.gridCB}>
						<View style={styles.gridItemCB}>
							<CheckBox
								title={"Yes"}
								checked={survey.is_replace_transit}
								onPress={() =>
									setSurvey({
										...survey,
										is_replace_transit: true,
									})
								}
							/>
						</View>
						<View style={styles.gridItemCB}>
							<CheckBox
								title={"No"}
								checked={!survey.is_replace_transit}
								onPress={() =>
									setSurvey({
										...survey,
										is_replace_transit: false,
									})
								}
							/>
						</View>
					</View>
				</View>

				<View>
					<Text>Who did you travel with?</Text>
					<View style={styles.gridCB}>
						<View style={styles.gridItemCB}>
							<CheckBox
								title={"By myself"}
								checked={survey.is_solo}
								onPress={() =>
									setSurvey({
										...survey,
										is_solo: true,
									})
								}
							/>
						</View>
						<View style={styles.gridItemCB}>
							<CheckBox
								title={"In a group"}
								checked={!survey.is_solo}
								onPress={() =>
									setSurvey({
										...survey,
										is_solo: false,
									})
								}
							/>
						</View>
					</View>
					{/* <Text>By myself/In a group</Text> */}
				</View>

				<View>
					<Text>Where did you go?</Text>
					<View style={styles.gridCB}>
						{destinationData.map((box, i) => (
							<View
								style={
									checkForLast(destinationData, i)
										? styles.lastGridItemCB
										: styles.gridItemCB
								}
								key={i}
							>
								<CheckBox
									iconRight={false}
									title={box.title}
									checked={survey.destination[i].choice}
									onPress={() => {
										// loop through previous state
										// if the index of the previous state is the same as the index passed in
										// then return that object with the change in choice value
										setSurvey({
											...survey,
											destination: survey.destination.map(
												(object, index) =>
													index === i && {
														...object,
														choice: !object.choice,
													}
											),
										});
									}}
									textStyle={{
										fontSize: 12,
										fontWeight: "bold",
									}}
									containerStyle={{
										height: "auto",
										paddingVertical: 0,
										paddingLeft: 0,
										margin: 0,
										// borderColor: "magenta",
										// borderWidth: 1,
									}}
								/>
							</View>
						))}
					</View>
				</View>

				<View>
					<Text>What kind of route did you take?</Text>
					<View style={styles.gridCB}>
						{routeData.map((box, i) => (
							<View
								style={
									checkForLast(routeData, i)
										? styles.lastGridItemCB
										: styles.gridItemCB
								}
								key={i}
							>
								<CheckBox
									iconRight={false}
									title={box.title}
									checked={survey.route[i].choice}
									onPress={() => {
										// loop through previous state
										// if the index of the previous state is the same as the index passed in
										// then return that object with the change in choice value
										setSurvey({
											...survey,
											route: survey.route.map(
												(object, index) =>
													index === i && {
														...object,
														choice: !object.choice,
													}
											),
										});
									}}
									textStyle={{
										fontSize: 12,
										fontWeight: "bold",
									}}
									containerStyle={{
										height: "auto",
										paddingVertical: 0,
										paddingLeft: 0,
										margin: 0,
										// borderColor: "magenta",
										// borderWidth: 1,
									}}
								/>
							</View>
						))}
					</View>
				</View>
			</View>
			<Button onPress={() => dispatch(toggleSurveyOpen())}>close</Button>
			<Button onPress={handleSubmit}>Submit</Button>
			{/* <Dialog
				isVisible={open}
				// onBackdropPress={()=>{
				//     setOpen(!open)
				// }}
			>
				<Text>
					Would you like to help BikeMN out by taking a quick survey
					about your ride?
				</Text>
				<Button>Yes</Button>
				<Button>No</Button>
			</Dialog> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-evenly",
		width: "100%",
		height: "100%",
	},
	popUp: {
		height: "90%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
		// borderColor:'green',
		// borderWidth:10
	},

	sectionView: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 5,
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	gridItem: {
		width: "50%",
		padding: 1,
	},
	lastGridItem: {
		width: "100%",
		padding: 1,
	},
	mainView: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		padding: "15px",
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
	gridCB: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		// alignItems: "flex-start",
		width: "100%",
		// borderColor:'lime',
		// borderWidth:1
	},
	gridItemCB: {
		width: "50%",
		padding: 0.5,
		marginVertical: 5,
		borderColor: "lime",
		borderWidth: 1,
	},
	lastGridItemCB: {
		width: "100%",
		padding: 1,
		marginVertical: 0,
		// borderColor: "lime",
		// borderWidth: 1,
	},
});
