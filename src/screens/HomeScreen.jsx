import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import CustomSpeedDial from "../components/CustomSpeedDial/CustomSpeedDial";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Modal,
	ScrollView,
	RefreshControl,
} from "react-native";
import { Text, SpeedDial, Button, LinearProgress, Card } from "@rneui/themed";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	staffGetBikes,
	getMyBike,
} from "../redux/thunks/private/staffBikeThunk";
import { clearOrgBikes } from "../redux/slices/private/orgBikeSlice";
import { clearMyBike } from "../redux/slices/private/staffBikeSlice";
import { clearDistance } from "../redux/slices/distanceSlice";

import { getUserTravelStats } from "../redux/thunks/userRidesThunk";
import {
	getActiveIncentives,
	getUserIncentiveProgress,
} from "../redux/thunks/incentiveThunk";

import { setIsProgressUpdated } from "../redux/slices/incentiveSlice";

import ChallengeCard from "../components/ChallengeCard/ChallengeCard";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
	const dispatch = useDispatch();

	const user = useSelector((store) => store.user);

	const travelStats = useSelector((store) => store.travelStats);

	const userInfo = { user_id: user.user_id, publicUser: user.is_public };

	const activeChallenges = useSelector((store) => store.incentives.active);

	const challengeProgress = useSelector((store) => store.incentives.progress);


	  const [refreshing, setRefreshing] = useState(false);
	useLayoutEffect(() => {
		dispatch(getUserTravelStats(user.user_id));
		dispatch(getActiveIncentives(userInfo));
		dispatch(getUserIncentiveProgress(user.user_id));
	},[dispatch]);

	const onRefresh = async () => {
		setRefreshing(true)
		dispatch(setIsProgressUpdated(false));
		try {
			dispatch(getUserTravelStats(user.user_id));
			dispatch(getActiveIncentives(userInfo));
			dispatch(getUserIncentiveProgress(user.user_id));

		} catch (error) {

		}finally{
			setRefreshing(false)
		}
	}


	if (user.username !== "finish_set_up") {
		return (
			<ScreenWrapper
				underScroll={<CustomSpeedDial />}
				background={{ backgroundColor: "#FFFAF2" }}
				onRefresh={onRefresh}
				refreshing={refreshing}
			>
				<View style={styles.sectionView}>
					<View style={styles.cenColAr}>
						<Text>Welcome {user.username}</Text>
					</View>
				</View>

				<View style={styles.cardSection}>
					<Text>Active Challenges</Text>

					{challengeProgress &&
						activeChallenges.map((chal) => (
							<ChallengeCard
								key={chal.id}
								item={chal}
								prog={challengeProgress}
							/>
						))}
				</View>

				{/*{
					info:
					category:
						incentive_type:"Replace VMT - Any"
						unit_of_measure: "rides"
					description: "Replace 5 car rides with bike rides!"
					id: 2
					point_value: 5
					title: "First Challenge"

				*/}

				<View style={styles.sectionView}>
					<View style={styles.leftColAr}>
						<Text style={styles.mv10}>
							{`${user.username}'s Stats`}
						</Text>
						<Text style={styles.mv10}>
							Total Rides: {travelStats.rides_total}
						</Text>
						<Text>
							Total Miles:{" "}
							{travelStats.miles_total
								? parseFloat(
										travelStats.miles_total?.toFixed(2)
								  )
								: 0}{" "}
							mi
						</Text>
						<Text style={styles.mv10}>
							Work Rides: {travelStats.commute_rides_total}
						</Text>
						<Text style={styles.mv10}>
							Miles from work rides:{" "}
							{travelStats.commute_miles_total
								? parseFloat(
										travelStats.commute_miles_total?.toFixed(
											2
										)
								  )
								: 0}{" "}
							mi
						</Text>
					</View>
				</View>

				<View style={styles.sectionView}></View>
			</ScreenWrapper>
		);
	} else {
		return <View></View>;
	}
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
	},
	keeb: {
		flex: 1,
	},
	scroll: {
		flexGrow: 1,
	},
	innerScroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	cardSection: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		padding: 5,
		borderRadius: 16,
		marginVertical: 10,
	},
	leftColAr: {
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
	},
	rightColAr: {
		justifyContent: "space-around",
		alignItems: "flex-end",
		width: "100%",
	},
	cenColAr: {
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	leftColBe: {
		justifyContent: "space-between",
		alignItems: "flex-start",
		width: "100%",
	},
	rightColBe: {
		justifyContent: "space-between",
		alignItems: "flex-end",
		width: "100%",
	},
	cenColBe: {
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	cenRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	mv10: {
		marginVertical: 10,
	},
});

{
	/* <Button
						raised
						onPress={() => {
							dispatch(staffGetBikes(user.org_id));
						}}
						containerStyle={styles.mv10}
					>
						get org bikes
					</Button>
					<Button
						raised
						onPress={() => {
							dispatch(getMyBike(user.user_id));
						}}
						containerStyle={styles.mv10}
					>
						get my bike
					</Button>
					<Button
						raised
						onPress={() => {
							dispatch(clearMyBike());
						}}
						containerStyle={styles.mv10}
					>
						clear my bike
					</Button>
					<Button
						raised
						onPress={() => {
							dispatch(clearOrgBikes());
						}}
						containerStyle={styles.mv10}
					>
						clear orgBikes
					</Button>
					<Button
						raised
						onPress={() => {
							dispatch(clearDistance());
						}}
						containerStyle={styles.mv10}
					>
						clear distance
					</Button> */
}
