import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Network from "expo-network";
import { useNavigation } from "@react-navigation/native";

import { Alert } from "react-native";
import {
	setNetworkStatus,
	queueAction,
	clearQueuedActions,
} from "../../redux/slices/networkSlice"

import { addToAllRides } from "../../redux/thunks/userRidesThunk";
import { clearDistance } from "../../redux/slices/distanceSlice";
import { clearCommuteSlice, toggleSurveyOpen } from "../../redux/slices/commuteSlice";

export const NetworkAwareness = async ({rideObj, userObj}) =>{
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const commute = useSelector((store)=>store.commute)


    Alert.alert(
		"Network reconnected",
		"Would you like to submit your previous ride?",
		[
			{
				text: "Yes, please!",
				onPress: () => {
					retry(rideObj, userObj)
				},
			},
			{
				text: "No thanks",
				style: "cancel",
			},
		],
		{ cancelable: false }
	);


    const retry = (rideObj, userObj) =>{
		dispatch(addToAllRides(rideObj))
			.then(() => {
				dispatch(clearDistance());
				if (rideObj.is_work_commute) {
					dispatch(checkChallengeCompletion(userObj));
					dispatch(clearCommuteSlice());
					navigation.navigate("HomeScreen");
				} else {
					Alert.alert(
						"Optional Survey ",
						"Would you like to take a super quick survey to help BikeMN's grant reporting?",
						[
							{
								text: "Sure!",
								onPress: () => {
									dispatch(toggleSurveyOpen());
									if (commute.is_survey_open) {
										navigation.navigate("HomeScreen");
									}
								},
							},
							{
								text: "No thanks",
								style: "cancel",
								onPress: () => {
									navigation.navigate("HomeScreen");
								},
							},
						],
						{ cancelable: false }
					);
				}
			})
			.catch((error) => {
				console.log("ERROR I GUESS", error);
			});
	}
    const connected = await Network.getNetworkStateAsync()


}

